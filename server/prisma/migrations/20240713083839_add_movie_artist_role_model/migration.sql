/*
  Warnings:

  - You are about to drop the column `role_in_movie` on the `movie_artist` table. All the data in the column will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_A_fkey";

-- AlterTable
ALTER TABLE "artist" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "image" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "movie" ADD COLUMN     "production_house" TEXT;

-- AlterTable
ALTER TABLE "movie_artist" DROP COLUMN "role_in_movie";

-- AlterTable
ALTER TABLE "role" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Genre";

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "genre_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_artist_role" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "movie_artist_id" INTEGER NOT NULL,

    CONSTRAINT "movie_artist_role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genre_genre_name_key" ON "genre"("genre_name");

-- AddForeignKey
ALTER TABLE "movie_artist_role" ADD CONSTRAINT "movie_artist_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_artist_role" ADD CONSTRAINT "movie_artist_role_movie_artist_id_fkey" FOREIGN KEY ("movie_artist_id") REFERENCES "movie_artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
