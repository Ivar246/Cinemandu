import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlists.service';
import { WatchlistController } from './watchlists.controller';

@Module({
  controllers: [WatchlistController],
  providers: [WatchlistService],
})
export class WatchlistModule { }
