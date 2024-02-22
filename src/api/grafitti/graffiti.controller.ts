import { Controller, Get, Query } from '@nestjs/common';
import { GraffitiService } from './graffiti.service';
import { Graffiti } from './graffiti.schema';
import { MetaData } from '../skins/skins.service';

@Controller('graffiti')
export class GraffitiController {
  constructor(private readonly graffitiService: GraffitiService) {}

  @Get()
  async findAll(
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ): Promise<{ data: Graffiti[]; metadata: MetaData }> {
    return this.graffitiService.findAll(perPage, page);
  }
}
