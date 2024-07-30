/*
  Warnings:

  - A unique constraint covering the columns `[user_id,movie_id]` on the table `watch_list` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "watch_list_user_id_movie_id_key" ON "watch_list"("user_id", "movie_id");
