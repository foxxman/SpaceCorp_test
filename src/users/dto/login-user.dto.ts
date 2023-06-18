import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// объект обмена данными между подсистемами, только описание, без логики
export class loginUserDto {
  @IsNotEmpty({ message: 'Login field cant be empty' })
  @ApiProperty({ example: '_foxxman_', description: 'Unique user login' })
  readonly login: string;

  @IsNotEmpty({ message: 'Password field cant be empty' })
  @ApiProperty({ example: '12345qwerty', description: 'User password' })
  readonly password: string;
}

// props for authResponseUserData
interface model {
  email: string;
  id: number;
  isActivated: boolean;
  login: string;
  banned: boolean;
}

// data to login or registration response
export class authResponseUserData {
  @ApiProperty({ example: '123', description: 'Unique user id' })
  id: number;

  @ApiProperty({ example: 'user@mail.com', description: 'Unique email' })
  email: string;

  @ApiProperty({ example: '_foxxman_', description: 'Unique user login' })
  login: string;

  @ApiProperty({
    example: 'false',
    description: 'Did user activate his acount',
  })
  isActivated: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Was user banned for smth',
  })
  banned: boolean;

  constructor(model: model) {
    this.email = model.email;
    this.login = model.login;
    this.banned = model.banned;
    this.id = Number(model.id);
    this.isActivated = model.isActivated;
  }
}

export class authResponseData {
  @ApiProperty({
    example: {
      id: 123,
      email: 'user@mail.com',
      login: '_foxxman_',
      isActivated: false,
      banned: false,
    },
    description: 'user data',
  })
  user: authResponseUserData;

  @ApiProperty({
    example: 'accesstokenstring',
    description: 'access token for authorized requests',
  })
  accessToken: string;
}
