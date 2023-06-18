import { IsNotEmpty } from 'class-validator';

// объект обмена данными между подсистемами, только описание, без логики
export class loginUserDto {
  @IsNotEmpty({ message: 'Login field cant be empty' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password field cant be empty' })
  readonly password: string;
}

// props for authResponseUserData
interface model {
  email: string;
  _id: string;
}

// data to login or registration response
export class authResponseUserData {
  _id: string;
  email: string;

  constructor(model: model) {
    this.email = model.email;
    this._id = String(model._id);
  }
}

export class authResponseData {
  user: authResponseUserData;
  accessToken: string;
}
