import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WatchlistService } from './watchlists.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { User } from 'src/common/decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

@ApiTags('watchlist')
@Controller('user/watchlist')
export class WatchlistController {
  constructor(private readonly watchlistsService: WatchlistService) { }

  @Post('/create')
  @ApiOperation({ description: "add movie to user watchlist" })
  create(
    @User("id") user_id: number,
    @Body() createWatchlistDto: CreateWatchlistDto) {
    return this.watchlistsService.create(user_id, createWatchlistDto);
  }

  @Get("/fetchall/:user_id")
  @ApiOperation({ description: "fetching  all data in user watchlist" })
  findAll(@Param("user_id", ParseIntPipe) user_id: number,
    @User("id") currentUserId: number,
    @User("user_role") currentUserRole: UserRole) {
    return this.watchlistsService.findAll(user_id, currentUserId, currentUserRole);
  }

  @Delete('')
  @ApiOperation({ description: "remove user" })
  remove(@Param('id') id: string) {
    return this.watchlistsService.remove(+id);
  }
}
