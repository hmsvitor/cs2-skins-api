import { Controller, Get, Param, Query } from '@nestjs/common';
import { SkinResponse, SkinsService } from './skins.service';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('skins')
@Controller('skins')
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {}

  @ApiQuery({
    name: 'weapon',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'pattern',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'stattrak',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'souvenir',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'wears',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'collections',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'crates',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'team',
    required: false,
    type: String,
  })
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
    @Query('weapon') weapon?: string,
    @Query('name') name?: string,
    @Query('category') category?: string,
    @Query('pattern') pattern?: string,
    @Query('stattrak') stattrak?: boolean,
    @Query('souvenir') souvenir?: boolean,
    @Query('wears') wears?: string[],
    @Query('collections') collections?: string[],
    @Query('crates') crates?: string[],
    @Query('team') team?: string,
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
  ): Promise<SkinResponse> {
    return this.skinsService.findAll({
      weapon,
      name,
      category,
      pattern,
      stattrak,
      souvenir,
      wears,
      collections,
      crates,
      team,
      page,
      perPage,
    });
  }

  @ApiParam({
    name: 'identifier',
    enum: [
      'weapon',
      'category',
      'pattern',
      'wears',
      'collections',
      'crates',
      'team',
    ],
    description: 'Identifier for fetching fetching values to filter skins',
  })
  @Get('/:identifier')
  async getUniqueIdentifiers(
    @Param('identifier') identifier: string,
  ): Promise<any> {
    switch (identifier) {
      case 'weapon':
        return this.skinsService.getUniqueWeapons();
      case 'category':
        return this.skinsService.getUniqueCategories();
      case 'pattern':
        return this.skinsService.getUniquePatterns();
      case 'wears':
        return this.skinsService.getUniqueWears();
      case 'collections':
        return this.skinsService.getUniqueCollections();
      case 'crates':
        return this.skinsService.getUniqueCrates();
      case 'team':
        return this.skinsService.getUniqueTeams();
      default:
        return [];
    }
  }
}
