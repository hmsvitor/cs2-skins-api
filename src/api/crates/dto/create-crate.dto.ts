import { Contain, ContainRare } from 'src/api/collectibles/collectibles.schema';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCrateDto {
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
  readonly type: string | null;

  @IsString()
  @IsNotEmpty()
  readonly first_sale_date: string | null;

  @IsString()
  @IsNotEmpty()
  readonly contains: Contain[];

  @IsString()
  @IsNotEmpty()
  readonly contains_rare: ContainRare[];

  @IsString()
  @IsNotEmpty()
  readonly image: string;
}
