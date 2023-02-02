<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\Note;
use App\Entity\Ticket;
use App\Entity\User;
use App\Form\NoteType;
use App\Form\TicketType;
use App\Repository\MessageRepository;
use App\Repository\NoteRepository;
use App\Repository\TicketRepository;
use App\Service\ValidationErrorResponse;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class NoteController extends AbstractController
{
    private $serializer;
    private $noteRepository;

    public function __construct(SerializerInterface $serializer, NoteRepository $noteRepository)
    {
        $this->serializer = $serializer;
        $this->noteRepository = $noteRepository;
        date_default_timezone_set("Europe/Paris");
    }

    /**
     * @Route("/note", name="app_note")
     */

        public function index(Request $request, NoteRepository $noteRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $note = $noteRepository->findby([
            "ticket"=> $data["ticket"]]);
        $serialized = $this->serializer->serialize($note, 'json', ['groups' => [Note::READ, User::SHORT_READ]]);
        return new Response($serialized);
    }

    /**
     * @Route("/note/add", name="app_note_add")
     */

    public function New(Request $request, ManagerRegistry $doctrine, ValidationErrorResponse $errorResponse): Response
    {

        $data = json_decode($request->getContent(), true);

        $note = new Note();
        $form = $this->createForm(NoteType::class, $note);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $doctrine->getManager()->persist($note);
            $doctrine->getManager()->flush();
            $serialized = $this->serializer->serialize($note, 'json', ['groups' => [Note::READ, User::SHORT_READ]]);
            return new Response($serialized);
        }

        return $errorResponse->createValidationErrorResponse($form);
    }

    /**
     * @param Request $request
     * @param Note $note
     * @param ManagerRegistry $doctrine
     * @return Response
     * @Route("/note/{id}/edit", name="app_note_edit")
     */
    public function edit(Request $request, Note $note, ManagerRegistry $doctrine): Response
    {

        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(NoteType::class, $note);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $doctrine->getManager()->flush();
            return new JsonResponse(array("Note modifie"));
        }

        return new JsonResponse(array('ERROR'), 400);
    }

    /**
     * @Route("/note/{id}/sup", name="app_note_sup")
     */
    public function sup(Note $note, ManagerRegistry $doctrine):Response
    {

        $doctrine->getManager()->remove($note);
        $doctrine->getManager()->flush();
        return new JsonResponse(array("Note supprime"));
    }
}
