import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import {
  Weapon,
  Category,
  Pattern,
  Rarity,
  Wear,
  Collection,
  Crate,
  Team,
} from 'src/api/skins/skins.schema';

export class CreateSkinDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly weapon: Weapon;

  @IsString()
  @IsNotEmpty()
  readonly category: Category;

  @IsString()
  @IsNotEmpty()
  readonly pattern: Pattern;

  @IsString()
  @IsNotEmpty()
  readonly rarity: Rarity;

  @IsBoolean()
  @IsNotEmpty()
  readonly stattrak: boolean;

  @IsBoolean()
  @IsNotEmpty()
  readonly souvenir: boolean;

  @IsString()
  @IsNotEmpty()
  readonly paint_index: string;

  @IsString()
  @IsNotEmpty()
  readonly wears: Wear[];

  @IsString()
  @IsNotEmpty()
  readonly collections: Collection[];

  @IsString()
  @IsNotEmpty()
  readonly crates: Crate[];

  @IsString()
  @IsNotEmpty()
  readonly team: Team;

  @IsString()
  @IsNotEmpty()
  readonly image: string;
}
