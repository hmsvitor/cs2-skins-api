import { Controller, Get, Query } from '@nestjs/common';
import { PatchesService } from './patches.service';
import { Patch } from './patches.schema';
import { MetaData } from '../skins/skins.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('patches')
@Controller('patches')
export class PatchesController {
  constructor(private readonly patchesService: PatchesService) {}

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
  ): Promise<{ data: Patch[]; metadata: MetaData }> {
    return this.patchesService.findAll(perPage, page);
  }
}
