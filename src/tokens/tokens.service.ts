import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userTokenDto } from 'src/users/dto/token-user.dto';
import { Token } from './tokens.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import authTokens from 'src/types/tokens';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Token') private tokensRepository: Model<Token>,
  ) {}

  async generateTokens(payload: userTokenDto): Promise<authTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: `${process.env.JWT_ACCESS_MINUTES}m`,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: `${process.env.JWT_REFRESH_DAYS}d`,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const token = await this.tokensRepository.findOne({ userId });

    if (token) {
      token.refreshToken = refreshToken;
      return token.save();
    }

    const newToken = await this.tokensRepository.create({
      refreshToken,
      userId,
    });
    
    return newToken;
  }

  validateAccessToken(accessToken: string): userTokenDto | null {
    try {
      const userData = this.jwtService.verify(accessToken, {
        publicKey: String(process.env.JWT_ACCESS_SECRET),
      });
      return userData;
    } catch (error: any) {
      throw new HttpException('Tokens verify issue', HttpStatus.BAD_REQUEST);
    }
  }

  validateRefreshToken(refreshToken: string): userTokenDto | null {
    try {
      const userData = this.jwtService.verify(refreshToken, {
        publicKey: String(process.env.JWT_REFRESH_SECRET),
      });
      return userData;
    } catch (error) {
      throw new HttpException('Tokens verify issue', HttpStatus.BAD_REQUEST);
    }
  }

  async findToken(refreshToken: string) {
    const token = await this.tokensRepository.findOne({ refreshToken });
    return token;
  }
}
