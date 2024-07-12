/*
  Warnings:

  - You are about to drop the column `released` on the `movie` table. All the data in the column will be lost.
  - Added the required column `isPublished` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_type` to the `movie` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Audience" AS ENUM ('CHILDREN', 'FAMILY', 'ADULT');

-- CreateEnum
CREATE TYPE "Format" AS ENUM ('FEATURE_FILM', 'SHORT_FILM', 'SERIAL');

-- AlterTable
ALTER TABLE "movie" DROP COLUMN "released",
ADD COLUMN     "audience" "Audience",
ADD COLUMN     "format" "Format",
ADD COLUMN     "full_movie_url" TEXT,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL,
ADD COLUMN     "movie_type" TEXT NOT NULL,
ADD COLUMN     "trailer_url" TEXT;

-- AlterTable
ALTER TABLE "movie_artist" ADD COLUMN     "role_in_movie" TEXT[];

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "genre_name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "artist_id" INTEGER,
    "movie_id" INTEGER,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenreToMovie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMovie_AB_unique" ON "_GenreToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMovie_B_index" ON "_GenreToMovie"("B");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
