import { Controller, Get, Query } from '@nestjs/common';
import { Sticker } from './stickers.schema';
import { MetaData } from '../skins/skins.service';
import { StickersService } from './stickers.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('stickers')
@Controller('stickers')
export class StickersController {
  constructor(private readonly stickersService: StickersService) {}

  @ApiQuery({
    name: 'perPage',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @Get()
  async findAll(
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ): Promise<{ data: Sticker[]; metadata: MetaData }> {
    return this.stickersService.findAll(perPage, page);
  }
}
