import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collectible } from './collectibles.schema';
import { CreateCollectibleDto } from './dto/create-collectible.dto';
import { MetaData } from '../skins/skins.service';

export type CollectibleResponse = {
  data: Collectible[];
  metadata: MetaData;
};

@Injectable()
export class CollectiblesService {
  constructor(
    @InjectModel('Collectible') private collectibleModel: Model<Collectible>,
  ) {}

  async findAll(
    perPage: number = 10,
    page: number = 1,
  ): Promise<CollectibleResponse> {
    const totalItems = await this.collectibleModel.countDocuments().exec();

    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page - 1) * perPage;

    const collectibles = await this.collectibleModel
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

    return { data: collectibles, metadata };
  }

  async create(
    createCollectibleDtos: CreateCollectibleDto,
  ): Promise<Collectible> {
    const createdCollectibles = new this.collectibleModel(
      createCollectibleDtos,
    );
    return createdCollectibles.save();
  }

  async createMany(
    createCollectibleDtos: CreateCollectibleDto[],
  ): Promise<Collectible[]> {
    const createdCollectibles = await this.collectibleModel.insertMany(
      createCollectibleDtos,
    );
    return createdCollectibles;
  }

  async findOne(id: string): Promise<Collectible> {
    const collectible = await this.collectibleModel.findById(id).exec();
    if (!collectible) {
      throw new NotFoundException(`Collectible with ID ${id} not found`);
    }
    return collectible;
  }

  async deleteMany(): Promise<void> {
    await this.collectibleModel.deleteMany({}).exec();
  }
}
