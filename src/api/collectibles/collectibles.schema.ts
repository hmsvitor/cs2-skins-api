import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Rarity } from 'src/api/skins/skins.schema';

export type CollectibleDocument = HydratedDocument<Collectible>;

@Schema()
export class Collectible {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string | null;

  @Prop()
  type: string;

  @Prop()
  first_sale_date: string | null;

  @Prop()
  contains: Contain[];

  @Prop()
  contains_rare: ContainRare[];

  @Prop()
  image: string;
}

export class Contain {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  rarity: Rarity;

  @Prop()
  point_index: string;

  @Prop()
  image: string;
}

export class ContainRare {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  rarity: Rarity;

  @Prop()
  point_index: string;

  @Prop({ required: false })
  phase?: string;

  @Prop()
  image: string;
}

export const CollectibleSchema = SchemaFactory.createForClass(Collectible);

export const CollectibleModel = mongoose.model<CollectibleDocument>(
  'Collectible',
  CollectibleSchema,
);
