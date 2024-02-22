import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Contain } from 'src/api/collectibles/collectibles.schema';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
export class Collection {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  contains: Contain[];

  @Prop()
  image: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);

export const CollectionModel = mongoose.model<CollectionDocument>(
  'Collection',
  CollectionSchema,
);
