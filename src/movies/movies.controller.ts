import { MoviesService } from './movies.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { movieInfoDto, movieUpdateDto } from './dto/create-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('movies')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true, // Enable string-to-number transformation
    },
  }),
)
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async getAllMovies(@Query('order') order: number) {
    console.log(order);
    const movies = await this.moviesService.getAll();

    if (!order) return movies;

    // order = 1 - increase
    // order = 0 - not increase
    return movies.sort((a, b) =>
      order == 1 ? a.rating - b.rating : b.rating - a.rating,
    );
  }

  @Get(':id')
  async getMovie(@Param('id') id: string) {
    const movie = await this.moviesService.getMovieById(id);
    return movie;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createMovie(@Body() dto: movieInfoDto, @UploadedFile() image: any) {
    console.log(dto);
    const movie = await this.moviesService.createMovie(dto, image);
    return movie;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor(''))
  async updateMovie(@Body() dto: movieUpdateDto, @Param('id') id: string) {
    console.log(id, dto);

    const movie = this.moviesService.updateMovie(id, dto);
    return movie;
  }

  @Delete(':id')
  async removeMovie() {}
}
