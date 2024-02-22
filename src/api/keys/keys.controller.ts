import { Controller, Query, Get } from '@nestjs/common';
import { KeysService } from './keys.service';
import { Key } from './keys.schema';
import { MetaData } from '../skins/skins.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('keys')
@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

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
  ): Promise<{ data: Key[]; metadata: MetaData }> {
    return this.keysService.findAll(perPage, page);
  }
}
