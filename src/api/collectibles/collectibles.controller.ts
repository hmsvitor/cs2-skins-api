import { Controller, Get, Query } from '@nestjs/common';
import { MetaData } from '../skins/skins.service';
import { CollectiblesService } from './collectibles.service';
import { Collectible } from './collectibles.schema';

@Controller('collectibles')
export class CollectiblesController {
  constructor(private readonly collectiblesService: CollectiblesService) {}

  @Get()
  async findAll(
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ): Promise<{ data: Collectible[]; metadata: MetaData }> {
    return this.collectiblesService.findAll(perPage, page);
  }
}
