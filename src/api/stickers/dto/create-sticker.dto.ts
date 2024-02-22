import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Crate, Rarity } from 'src/api/skins/skins.schema';

export class CreateStickerDto {
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
  readonly rarity: Rarity;

  @IsString()
  @IsNotEmpty()
  readonly crates: Crate[];

  @IsString()
  @IsNotEmpty()
  readonly image: string;
}
