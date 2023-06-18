import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class createMovieDto {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly rating: number;
}

export class movieInfoDto {
  @IsString()
  @Length(1)
  readonly title: string;

  @IsString()
  @Length(1)
  readonly description: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  readonly rating: number;
}

export class movieUpdateDto {
  @IsOptional()
  @IsString()
  @Length(1)
  readonly title: string;

  @IsOptional()
  @IsString()
  @Length(1)
  readonly description: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  readonly rating: number;
}
