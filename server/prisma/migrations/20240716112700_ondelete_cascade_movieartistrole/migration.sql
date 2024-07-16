-- DropForeignKey
ALTER TABLE "movie_artist_role" DROP CONSTRAINT "movie_artist_role_movie_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "movie_artist_role" DROP CONSTRAINT "movie_artist_role_role_id_fkey";

-- AddForeignKey
ALTER TABLE "movie_artist_role" ADD CONSTRAINT "movie_artist_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_artist_role" ADD CONSTRAINT "movie_artist_role_movie_artist_id_fkey" FOREIGN KEY ("movie_artist_id") REFERENCES "movie_artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
