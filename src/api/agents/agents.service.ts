import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent } from './agents.schema';
import { CreateAgentDto } from './dto/create-agent.dto';
import { MetaData } from 'src/api/skins/skins.service';

export type AgentResponse = {
  data: Agent[];
  metadata: MetaData;
};

@Injectable()
export class AgentsService {
  constructor(@InjectModel('Agent') private agentModel: Model<Agent>) {}

  async findAll(
    perPage: number = 10,
    page: number = 1,
  ): Promise<AgentResponse> {
    const totalItems = await this.agentModel.countDocuments().exec();

    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page - 1) * perPage;

    const agents = await this.agentModel
      .find()
      .skip(skip)
      .limit(perPage)
      .exec();

    const metadata = {
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
    };

    return { data: agents, metadata };
  }

  async create(createAgentDtos: CreateAgentDto): Promise<Agent> {
    const createdAgent = new this.agentModel(createAgentDtos);
    return createdAgent.save();
  }

  async createMany(createAgentDtos: CreateAgentDto[]): Promise<Agent[]> {
    const createdAgents = await this.agentModel.insertMany(createAgentDtos);
    return createdAgents;
  }

  async findOne(id: string): Promise<Agent> {
    const agent = await this.agentModel.findById(id).exec();
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }
    return agent;
  }

  async deleteMany(): Promise<void> {
    await this.agentModel.deleteMany({}).exec();
  }
}
