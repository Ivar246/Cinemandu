-- CreateTable
CREATE TABLE "movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "released_date" TIMESTAMP(3) NOT NULL,
    "runtime" INTEGER NOT NULL,
    "poster_url" TEXT,
    "plot_summary" TEXT,
    "released" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_artist" (
    "id" SERIAL NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,

    CONSTRAINT "movie_artist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_artist_artist_id_movie_id_key" ON "movie_artist"("artist_id", "movie_id");

-- AddForeignKey
ALTER TABLE "movie_artist" ADD CONSTRAINT "movie_artist_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_artist" ADD CONSTRAINT "movie_artist_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
