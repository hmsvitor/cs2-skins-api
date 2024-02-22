import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Rarity, Crate } from 'src/api/skins/skins.schema';

export class CreateGraffitiDto {
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
