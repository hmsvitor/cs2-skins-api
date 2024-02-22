import { Controller, Get, Query } from '@nestjs/common';
import { PatchesService } from './patches.service';
import { Patch } from './patches.schema';
import { MetaData } from '../skins/skins.service';

@Controller('patches')
export class PatchesController {
  constructor(private readonly patchesService: PatchesService) {}

  @Get()
  async findAll(
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ): Promise<{ data: Patch[]; metadata: MetaData }> {
    return this.patchesService.findAll(perPage, page);
  }
}
