import { Controller, Query, Get } from '@nestjs/common';
import { KeysService } from './keys.service';
import { Key } from './keys.schema';
import { MetaData } from '../skins/skins.service';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Get()
  async findAll(
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ): Promise<{ data: Key[]; metadata: MetaData }> {
    return this.keysService.findAll(perPage, page);
  }
}
