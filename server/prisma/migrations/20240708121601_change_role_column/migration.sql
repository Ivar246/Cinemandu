/*
  Warnings:

  - You are about to drop the column `name` on the `artist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[artist_id,role_id]` on the table `artist_role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_name]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artist_name` to the `artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_name` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "role_name_key";

-- AlterTable
ALTER TABLE "artist" DROP COLUMN "name",
ADD COLUMN     "artist_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "role" DROP COLUMN "name",
ADD COLUMN     "role_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "artist_role_artist_id_role_id_key" ON "artist_role"("artist_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_role_name_key" ON "role"("role_name");
