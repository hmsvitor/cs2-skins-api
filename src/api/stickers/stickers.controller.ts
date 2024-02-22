import { Controller, Get, Query } from '@nestjs/common';
import { Sticker } from './stickers.schema';
import { MetaData } from '../skins/skins.service';
import { StickersService } from './stickers.service';

@Controller('stickers')
export class StickersController {
  constructor(private readonly stickersService: StickersService) {}

  @Get()
  async findAll(
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ): Promise<{ data: Sticker[]; metadata: MetaData }> {
    return this.stickersService.findAll(perPage, page);
  }
}
