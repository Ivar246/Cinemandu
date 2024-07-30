import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class WatchlistService {

  constructor(private readonly prisma: PrismaService) { }
  async create(user_id: number, createWatchlistDto: CreateWatchlistDto) {
    try {
      const watchlist = await this.prisma.watchList.create({
        data: {
          user_id: user_id,
          movie_id: createWatchlistDto.movie_id
        },
        include: {
          movie: true
        }
      });

      return { data: watchlist };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === "P2002")
          throw new HttpException("Movie already added in watchlist", HttpStatus.CONFLICT)
      throw error;
    }
  }

  async findAll(user_id: number) {
    try {
      const userWatchlist = await this.prisma.watchList.findMany({
        where: {
          user_id: user_id,
        },
        include: {
          movie: true
        }
      });

      return { data: { userWatchlist } };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {

    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateWatchlistDto: UpdateWatchlistDto) {
    try {

    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {

    } catch (error) {
      throw error;
    }
  }
}
