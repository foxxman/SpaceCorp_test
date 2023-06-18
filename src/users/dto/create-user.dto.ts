import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

// объект обмена данными между подсистемами, только описание, без логики
export class createUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @ApiProperty({ example: 'user@mail.com', description: 'Unique email' })
  readonly email: string;

  @IsString({ message: 'Must be a string' }) // validation
  @Length(8, 30, {
    message: 'Password length must be from 8 to 30 symbols',
  })
  @ApiProperty({ example: '12345qwerty', description: 'User password' })
  readonly password: string;
}

export class userModelDto {
  readonly password: string;
  readonly email: string;
}
