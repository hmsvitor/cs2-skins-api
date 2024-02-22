import { Controller, Get, Query } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Collection } from './collections.schema';
import { MetaData } from '../skins/skins.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

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
  ): Promise<{ data: Collection[]; metadata: MetaData }> {
    return this.collectionsService.findAll(perPage, page);
  }
}
