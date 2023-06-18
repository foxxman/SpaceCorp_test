import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  // SequelizeModule.forFeature - to define which models are registered in the current scope
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
