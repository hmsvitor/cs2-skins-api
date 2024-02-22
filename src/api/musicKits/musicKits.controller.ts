import { Controller, Get, Query } from '@nestjs/common';
import { MusicKitsService } from './musicKits.service';
import { MetaData } from '../skins/skins.service';
import { MusicKit } from './musicKits.schema';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('musicKits')
@Controller('musicKits')
export class MusicKitsController {
  constructor(private readonly musicKitsService: MusicKitsService) {}

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
  ): Promise<{ data: MusicKit[]; metadata: MetaData }> {
    return this.musicKitsService.findAll(perPage, page);
  }
}
