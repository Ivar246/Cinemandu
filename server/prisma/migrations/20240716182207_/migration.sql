/*
  Warnings:

  - A unique constraint covering the columns `[role_id,movie_artist_id]` on the table `movie_artist_role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "movie_artist_role_role_id_movie_artist_id_key" ON "movie_artist_role"("role_id", "movie_artist_id");
