import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './movies.model';
import { FilesService } from 'src/files/files.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    FilesModule,
  ],
})
export class MoviesModule {}
