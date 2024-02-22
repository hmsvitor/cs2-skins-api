import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Key } from './keys.schema';
import { CreateKeyDto } from './dto/create-key.dto';
import { MetaData } from '../skins/skins.service';

export type KeyResponse = {
  data: Key[];
  metadata: MetaData;
};

@Injectable()
export class KeysService {
  constructor(@InjectModel('Key') private keyModel: Model<Key>) {}

  async findAll(perPage: number = 10, page: number = 1): Promise<KeyResponse> {
    const totalItems = await this.keyModel.countDocuments().exec();

    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page - 1) * perPage;

    const keys = await this.keyModel.find().skip(skip).limit(perPage).exec();

    const metadata = {
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
    };

    return { data: keys, metadata };
  }

  async create(createKeyDtos: CreateKeyDto): Promise<Key> {
    const createdKey = new this.keyModel(createKeyDtos);
    return createdKey.save();
  }

  async createMany(createKeyDtos: CreateKeyDto[]): Promise<Key[]> {
    const createdKeys = await this.keyModel.insertMany(createKeyDtos);
    return createdKeys;
  }

  async findOne(id: string): Promise<Key> {
    const key = await this.keyModel.findById(id).exec();
    if (!key) {
      throw new NotFoundException(`Key with ID ${id} not found`);
    }
    return key;
  }

  async deleteMany(): Promise<void> {
    await this.keyModel.deleteMany({}).exec();
  }
}
