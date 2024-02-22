import { Controller, Get, Query } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { Agent } from './agents.schema';
import { MetaData } from 'src/api/skins/skins.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

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
  ): Promise<{ data: Agent[]; metadata: MetaData }> {
    return this.agentsService.findAll(perPage, page);
  }
}
