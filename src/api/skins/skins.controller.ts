import { Controller, Get, Param, Query } from '@nestjs/common';
import { SkinResponse, SkinsService } from './skins.service';

@Controller('skins')
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {}

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
