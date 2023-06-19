import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movies.model';
import { movieInfoDto, movieUpdateDto } from './dto/create-movie.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private moviesRepository: Model<Movie>,
    private filesService: FilesService,
  ) {}

  async getAll() {
    try {
      const movies = await this.moviesRepository.find();
      return movies;
    } catch (error) {
      throw new HttpException(
        'Something wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMovie(dto: movieInfoDto, image: any) {
    try {
      if (!image)
        throw new HttpException('Image expected', HttpStatus.BAD_REQUEST);

      const fileName = await this.filesService.createFile(image);

      const movie = await this.moviesRepository.create({
        ...dto,
        image: fileName,
      });

      return movie;
    } catch (error) {
      throw new HttpException(
        error.message || 'Something wrong',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMovieById(id: string) {
    try {
      const movie = await this.moviesRepository.findById(id);
      return movie;
    } catch (error) {
      throw new HttpException(
        'There is no any movies with this id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateMovie(id: string, data: movieUpdateDto, image: any) {
    let fileName: null | string = null;
    const movie = await this.moviesRepository.findById(id);

    try {
      if (image) {
        await this.filesService.removeFile(movie.image);
        fileName = await this.filesService.createFile(image);
      }
      const updatedMovie = await this.moviesRepository.findByIdAndUpdate(
        id,
        { ...data, image: image ? fileName : movie.image },
        { new: true },
      );

      return updatedMovie;
    } catch (error) {
      throw new HttpException(
        error.message || 'Updating error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeMovie(id: string) {
    try {
      const movie = await this.moviesRepository.findById(id);

      await this.filesService.removeFile(movie.image);

      const removedMovie = this.moviesRepository.findByIdAndRemove(id);

      return removedMovie;
    } catch (error) {
      throw new HttpException(
        error.message || "Can't delete this movie",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
