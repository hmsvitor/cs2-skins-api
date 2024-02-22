import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Graffiti } from './graffiti.schema';
import { CreateGraffitiDto } from './dto/create-graffiti.dto';
import { MetaData } from '../skins/skins.service';

export type GraffitiResponse = {
  data: Graffiti[];
  metadata: MetaData;
};

@Injectable()
export class GraffitiService {
  constructor(
    @InjectModel('Graffiti') private graffitiModel: Model<Graffiti>,
  ) {}

  async findAll(
    perPage: number = 10,
    page: number = 1,
  ): Promise<GraffitiResponse> {
    const totalItems = await this.graffitiModel.countDocuments().exec();

    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page - 1) * perPage;

    const graffiti = await this.graffitiModel
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

    return { data: graffiti, metadata };
  }

  async create(createGraffitiDtos: CreateGraffitiDto): Promise<Graffiti> {
    const createdGraffiti = new this.graffitiModel(createGraffitiDtos);
    return createdGraffiti.save();
  }

  async createMany(
    createGraffitiDtos: CreateGraffitiDto[],
  ): Promise<Graffiti[]> {
    const createdGraffiti =
      await this.graffitiModel.insertMany(createGraffitiDtos);
    return createdGraffiti;
  }

  async findOne(id: string): Promise<Graffiti> {
    const graffiti = await this.graffitiModel.findById(id).exec();
    if (!graffiti) {
      throw new NotFoundException(`Graffiti with ID ${id} not found`);
    }
    return graffiti;
  }

  async deleteMany(): Promise<void> {
    await this.graffitiModel.deleteMany({}).exec();
  }
}
