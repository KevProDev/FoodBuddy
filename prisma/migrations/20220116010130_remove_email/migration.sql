/*
  Warnings:

  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Profile_email_key` ON `Profile`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `email`;
