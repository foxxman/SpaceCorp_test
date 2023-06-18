import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from './tokens.model';

@Module({
  providers: [TokensService],
  imports: [
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
    JwtModule,
  ],
  exports: [TokensService],
})
export class TokensModule {}
