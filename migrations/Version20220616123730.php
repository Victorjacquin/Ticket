<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220616123730 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ticket CHANGE created_by_id created_by_id INT NOT NULL, CHANGE supported_by_id supported_by_id INT NOT NULL, CHANGE page page VARCHAR(255) DEFAULT NULL, CHANGE status status INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ticket CHANGE created_by_id created_by_id INT DEFAULT NULL, CHANGE supported_by_id supported_by_id INT DEFAULT NULL, CHANGE page page VARCHAR(255) NOT NULL, CHANGE status status INT DEFAULT 1 NOT NULL');
    }
}
