import { IsNotEmpty, IsString } from 'class-validator';

export class userTokenDto {
  readonly _id: string;
  readonly email: string;

  constructor(_id: string, email: string) {
    this._id = _id;
    this.email = email;
  }
}

export class refreshTokenDto {
  @IsNotEmpty({ message: 'refresh token cant be empty' })
  @IsString({ message: 'refresh token must be a string' })
  readonly refreshToken: string;
}
