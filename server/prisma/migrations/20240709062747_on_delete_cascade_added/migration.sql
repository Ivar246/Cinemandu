-- DropForeignKey
ALTER TABLE "artist_role" DROP CONSTRAINT "artist_role_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "artist_role" DROP CONSTRAINT "artist_role_role_id_fkey";

-- AddForeignKey
ALTER TABLE "artist_role" ADD CONSTRAINT "artist_role_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artist_role" ADD CONSTRAINT "artist_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
