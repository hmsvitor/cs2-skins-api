import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Rarity } from 'src/api/skins/skins.schema';

export type KeyDocument = HydratedDocument<Key>;

@Schema()
export class Key {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string | null;

  @Prop()
  rarity: Rarity;

  @Prop()
  type: string | null;

  @Prop()
  image: string;
}

export const KeySchema = SchemaFactory.createForClass(Key);

export const KeyModel = mongoose.model<KeyDocument>('Key', KeySchema);
