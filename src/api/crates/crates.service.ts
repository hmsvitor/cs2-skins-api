import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crate } from './crates.schema';
import { CreateCrateDto } from './dto/create-crate.dto';
import { MetaData } from '../skins/skins.service';

export type CrateResponse = {
  data: Crate[];
  metadata: MetaData;
};

@Injectable()
export class CratesService {
  constructor(@InjectModel('Crate') private crateModel: Model<Crate>) {}

  async findAll(
    perPage: number = 10,
    page: number = 1,
  ): Promise<CrateResponse> {
    const totalItems = await this.crateModel.countDocuments().exec();

    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page - 1) * perPage;

    const crates = await this.crateModel
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

    return { data: crates, metadata };
  }

  async create(createCrateDtos: CreateCrateDto): Promise<Crate> {
    const createdCrate = new this.crateModel(createCrateDtos);
    return createdCrate.save();
  }

  async createMany(createCrateDtos: CreateCrateDto[]): Promise<Crate[]> {
    const createdCrates = await this.crateModel.insertMany(createCrateDtos);
    return createdCrates;
  }

  async findOne(id: string): Promise<Crate> {
    const crate = await this.crateModel.findById(id).exec();
    if (!crate) {
      throw new NotFoundException(`Crate with ID ${id} not found`);
    }
    return crate;
  }

  async deleteMany(): Promise<void> {
    await this.crateModel.deleteMany({}).exec();
  }
}
