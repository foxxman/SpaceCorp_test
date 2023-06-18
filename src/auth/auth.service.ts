import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import {
  authResponseUserData,
  loginUserDto,
} from 'src/users/dto/login-user.dto';
import { TokensService } from 'src/tokens/tokens.service';
import authTokens from 'src/types/tokens';
import { userTokenDto } from 'src/users/dto/token-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}
  async registration(dto: createUserDto) {
    const candidateEmail = await this.usersService.getUserByEmail(dto.email);

    // check if login or email exists
    if (candidateEmail) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);

    // creating user
    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    });

    const tokens = await this.generateTokens(user);

    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    // return user and tokens
    return {
      user: {
        _id: String(user._id),
        email: user.email,
      },
      tokens,
    };
  }

  async login(dto: loginUserDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.generateTokens(user);

    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return {
      user: {
        _id: String(user._id),
        email: user.email,
      },
      tokens,
    };
  }

  private async generateTokens(user: userTokenDto) {
    const payload = {
      email: user.email,
      _id: user._id,
    };

    const tokens = await this.tokensService.generateTokens(payload);

    return tokens;
  }

  private async validateUser(dto: loginUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Uncorrect login or password');

    const isPasswordsEqual = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordsEqual)
      throw new UnauthorizedException('Uncorrect login or password');

    return user;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    // validate token
    const userData = this.tokensService.validateRefreshToken(refreshToken);
    // check that token exists
    const tokenFromDB = await this.tokensService.findToken(refreshToken);

    // Unaithorized if smth wrong
    if (!userData || !tokenFromDB) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersService.getUserByEmail(userData.email);

    if (user) {
      // gets only the important fields we need
      const userDto = new userTokenDto(user._id, user.email);
      // will return refresh and access tokens
      const tokens = await this.tokensService.generateTokens({ ...userDto });
      // save only refresh
      await this.tokensService.saveToken(userDto._id, tokens.refreshToken);

      return { tokens, user: userDto };
    } else {
      throw new HttpException(
        'Cant find the user by id in the token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
