<?php

// src/Service/ValidationErrorResponse.php
namespace App\Service;

use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class ValidationErrorResponse
{
    private function getErrorsFromForm(FormInterface $form)
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }

        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }
        return $errors;
    }

    public function createValidationErrorResponse(FormInterface $form): JsonResponse
    {
        $errors = $this->getErrorsFromForm($form);
        $data = [
            'type' => 'validation_error',
            'title' => 'There was a validation error',
            'errors' => $errors
        ];
        return new JsonResponse($data, 400);
    }

    public function createRawValidationError(FormInterface $form): array
    {
        return $this->getErrorsFromForm($form);
    }
}
