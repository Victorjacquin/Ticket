<?php

namespace App\Controller;

use App\Entity\Ticket;
use App\Entity\User;
use App\Form\TicketType;
use App\Repository\TicketRepository;
use App\Service\ValidationErrorResponse;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

class TicketController extends AbstractController
{
    private $serializer;
    private $ticketRepository;

    public function __construct(SerializerInterface $serializer, TicketRepository $ticketRepository)
    {
        $this->serializer = $serializer;
        $this->ticketRepository = $ticketRepository;
        date_default_timezone_set("Europe/Paris");
    }

    /**
     * @Route("/ticket", name="app_ticket")
     */

    public function index(): Response
    {
        $tickets = $this->ticketRepository->findAll();
        $serialized = $this->serializer->serialize($tickets, 'json', ['groups' => [Ticket::READ]]);
        return new Response($serialized);
    }

    /**
     * @Route("/ticket/add", name="app_ticket_add")
     */
    public function New(Request $request, ManagerRegistry $doctrine, ValidationErrorResponse $errorResponse): Response
    {

        $data = json_decode($request->getContent(), true);

        $ticket = new Ticket();
        $ticket->setCreatedBy($this->getUser());
        $form = $this->createForm(TicketType::class, $ticket);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $doctrine->getManager()->persist($ticket);
            $doctrine->getManager()->flush();
            $serialized = $this->serializer->serialize($ticket, 'json', ['groups' => [Ticket::READ, User::SHORT_READ]]);
            return new Response($serialized);
        }

        return $errorResponse->createValidationErrorResponse($form);
    }

    /**
     * @Route("/ticket/{id}", name="app_ticket_alone")
     */

    public function ticket(Ticket $ticket): Response
    {
        $serialized = $this->serializer->serialize($ticket, 'json', ['groups' => [Ticket::READ, User::SHORT_READ]]);
        return new Response($serialized);
    }



    /**
     * @param Request $request
     * @param Ticket $ticket
     * @param ManagerRegistry $doctrine
     * @return Response
     * @Route("/ticket/{id}/edit", name="app_ticket_edit")
     */
    public function edit(Request $request, Ticket $ticket, ManagerRegistry $doctrine): Response
    {

        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(TicketType::class, $ticket);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $doctrine->getManager()->flush();
            return new JsonResponse(array("Ticket modifie"));
        }

        return new JsonResponse(array('ERROR'), 400);
    }

    /**
     * @Route("/ticket/sup/{id}", name="app_ticket_sup")
     */
    public function sup(Ticket $ticket, ManagerRegistry $doctrine):Response
    {

        $doctrine->getManager()->remove($ticket);
        $doctrine->getManager()->flush();
        return new JsonResponse(array("Ticket supprime"));
    }

    /**
     * @Route("/ticket/status/{ticket}/{status}", name="app_ticket_status")
     */

    public function status(Ticket $ticket, int $status, ManagerRegistry $doctrine): Response
    {
        $ticket->setStatus($status);
        $doctrine->getManager()->flush();

        return new JsonResponse(array("Status modifie"));

    }


}