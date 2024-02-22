import { Controller, Query, Get } from '@nestjs/common';
import { CratesService } from './crates.service';
import { Crate } from './crates.schema';
import { MetaData } from '../skins/skins.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('crates')
@Controller('crates')
export class CratesController {
  constructor(private readonly cratesService: CratesService) {}

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
  ): Promise<{ data: Crate[]; metadata: MetaData }> {
    return this.cratesService.findAll(perPage, page);
  }
}
