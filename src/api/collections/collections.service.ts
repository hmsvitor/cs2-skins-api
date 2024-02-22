import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from './collections.schema';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { MetaData } from '../skins/skins.service';

export type CollectionResponse = {
  data: Collection[];
  metadata: MetaData;
};

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel('Collection') private collectionModel: Model<Collection>,
  ) {}

  async findAll(
    perPage: number = 10,
    page: number = 1,
  ): Promise<CollectionResponse> {
    const totalItems = await this.collectionModel.countDocuments().exec();

    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page - 1) * perPage;

    const collections = await this.collectionModel
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

    return { data: collections, metadata };
  }

  async create(createCollectionDtos: CreateCollectionDto): Promise<Collection> {
    const createdCollection = new this.collectionModel(createCollectionDtos);
    return createdCollection.save();
  }

  async createMany(
    createCollectionDtos: CreateCollectionDto[],
  ): Promise<Collection[]> {
    const createdCollection =
      await this.collectionModel.insertMany(createCollectionDtos);
    return createdCollection;
  }

  async findOne(id: string): Promise<Collection> {
    const collection = await this.collectionModel.findById(id).exec();
    if (!collection) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }
    return collection;
  }

  async deleteMany(): Promise<void> {
    await this.collectionModel.deleteMany({}).exec();
  }
}
