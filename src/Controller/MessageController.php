<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\Ticket;
use App\Entity\User;
use App\Form\MessageType;
use App\Repository\MessageRepository;
use App\Repository\TicketRepository;
use App\Service\ValidationErrorResponse;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class MessageController extends AbstractController
{
    private $serializer;
    private $messageRepository;

    public function __construct(SerializerInterface $serializer, MessageRepository $messageRepository)
    {
        $this->serializer = $serializer;
        $this->messageRepository = $messageRepository;
        date_default_timezone_set("Europe/Paris");
    }

    /**
     * @Route("/messagebyticket", name="messagebyticket")
     */

    public function index(Request $request, MessageRepository $messageRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $message = $messageRepository->findby([
            "ticket"=> $data["ticket"]]);
        $serialized = $this->serializer->serialize($message, 'json', ['groups' => [Message::READ, User::SHORT_READ]]);
        return new Response($serialized);
    }

    /**
     * @Route("/message/add", name="app_message_add")
     */

    public function New(Request $request, ManagerRegistry $doctrine, ValidationErrorResponse $errorResponse): Response
    {

        $data = json_decode($request->getContent(), true);

        $message = new Message();
        $message->setUser($this->getUser());
        $form = $this->createForm(MessageType::class, $message);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $doctrine->getManager()->persist($message);
            $doctrine->getManager()->flush();
            $serialized = $this->serializer->serialize($message, 'json', ['groups' => [Message::READ, User::SHORT_READ]]);
            return new Response($serialized);
        }

        return $errorResponse->createValidationErrorResponse($form);
    }

    /**
     * @param Request $request
     * @param Message $message
     * @param ManagerRegistry $doctrine
     * @return Response
     * @Route("/message/{id}/edit", name="app_message_edit")
     */
    public function edit(Request $request, Message $message, ManagerRegistry $doctrine): Response
    {

        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(MessageType::class, $message);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $doctrine->getManager()->flush();
            return new JsonResponse(array("Message modifie"));
        }

        return new JsonResponse(array('ERROR'), 400);
    }

    /**
     * @Route("/message/{id}/sup", name="app_message_sup")
     */
    public function sup(Message $message, ManagerRegistry $doctrine):Response
    {

        $doctrine->getManager()->remove($message);
        $doctrine->getManager()->flush();
        return new JsonResponse(array("Message supprime"));
    }

}
