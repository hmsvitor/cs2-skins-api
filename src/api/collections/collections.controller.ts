import { Controller, Get, Query } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Collection } from './collections.schema';
import { MetaData } from '../skins/skins.service';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async findAll(
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ): Promise<{ data: Collection[]; metadata: MetaData }> {
    return this.collectionsService.findAll(perPage, page);
  }
}
