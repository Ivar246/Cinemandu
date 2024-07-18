/*
  Warnings:

  - A unique constraint covering the columns `[artist_name,DOB]` on the table `artist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "user_role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "artist_artist_name_DOB_key" ON "artist"("artist_name", "DOB");
