import { Controller, Get, Query } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { Agent } from './agents.schema';
import { MetaData } from 'src/api/skins/skins.service';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  async findAll(
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ): Promise<{ data: Agent[]; metadata: MetaData }> {
    return this.agentsService.findAll(perPage, page);
  }
}
