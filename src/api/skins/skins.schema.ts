import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SkinDocument = HydratedDocument<Skin>;

export class Weapon {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export class Category {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export class Pattern {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export class Rarity {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  color: string;
}

export class Wear {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export class Collection {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  image: string;
}

export class Crate {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  image: string;
}

export class Team {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

@Schema()
export class Skin {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string | null;

  @Prop()
  weapon: Weapon;

  @Prop()
  category: Category;

  @Prop()
  pattern: Pattern;

  @Prop()
  rarity: Rarity;

  @Prop()
  stattrak: boolean;

  @Prop()
  souvenir: boolean;

  @Prop()
  paint_index: string;

  @Prop()
  wears: Wear[];

  @Prop()
  collections: Collection[];

  @Prop()
  crates: Crate[];

  @Prop()
  team: Team;

  @Prop()
  image: string;
}

export const SkinSchema = SchemaFactory.createForClass(Skin);

export const SkinModel = mongoose.model<SkinDocument>('Skin', SkinSchema);
