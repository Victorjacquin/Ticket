<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Cassandra\Date;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MessageRepository::class)
 */
class Message
{

    const READ = 'message:read';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="messages")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"message:read"})
     */
    private $user;

    /**
     * @ORM\Column(type="text", nullable=false)
     * @Groups({"message:read"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"message:read"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=Ticket::class, inversedBy="messages")
     * @ORM\JoinColumn(nullable=false)
     */
    private $ticket;

    /**
     * @ORM\OneToMany(targetEntity=File::class, mappedBy="message")
     * @Groups({"message:read"})
     */
    private $files;

    public function __construct()
    {
        $this->createdAt = new \DateTime("now");
        $this->files = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getTicket(): ?Ticket
    {
        return $this->ticket;
    }

    public function setTicket(?Ticket $ticket): self
    {
        $this->ticket = $ticket;

        return $this;
    }

    /**
     * @return Collection<int, file>
     */
    public function getFiles(): Collection
    {
        return $this->files;
    }

    public function addFile(file $file): self
    {
        if (!$this->files->contains($file)) {
            $this->files[] = $file;
            $file->setMessage($this);
        }

        return $this;
    }

    public function removeFile(file $file): self
    {
        if ($this->files->removeElement($file)) {
            // set the owning side to null (unless already changed)
            if ($file->getMessage() === $this) {
                $file->setMessage(null);
            }
        }

        return $this;
    }


}
