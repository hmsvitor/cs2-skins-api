import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Rarity } from 'src/api/skins/skins.schema';

export type MusicKitDocument = HydratedDocument<MusicKit>;

@Schema()
export class MusicKit {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string | null;

  @Prop()
  rarity: Rarity;

  @Prop()
  exclusive: boolean;

  @Prop()
  image: string;
}

export const MusicKitSchema = SchemaFactory.createForClass(MusicKit);

export const MusicKitModel = mongoose.model<MusicKitDocument>(
  'MusicKit',
  MusicKitSchema,
);
