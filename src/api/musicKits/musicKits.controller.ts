import { Controller, Get, Query } from '@nestjs/common';
import { MusicKitsService } from './musicKits.service';
import { MetaData } from '../skins/skins.service';
import { MusicKit } from './musicKits.schema';

@Controller('musicKits')
export class MusicKitsController {
  constructor(private readonly musicKitsService: MusicKitsService) {}

  @Get()
  async findAll(
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ): Promise<{ data: MusicKit[]; metadata: MetaData }> {
    return this.musicKitsService.findAll(perPage, page);
  }
}
