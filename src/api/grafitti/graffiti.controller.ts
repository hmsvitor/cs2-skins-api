import { Controller, Get, Query } from '@nestjs/common';
import { GraffitiService } from './graffiti.service';
import { Graffiti } from './graffiti.schema';
import { MetaData } from '../skins/skins.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('graffiti')
@Controller('graffiti')
export class GraffitiController {
  constructor(private readonly graffitiService: GraffitiService) {}

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
  ): Promise<{ data: Graffiti[]; metadata: MetaData }> {
    return this.graffitiService.findAll(perPage, page);
  }
}
