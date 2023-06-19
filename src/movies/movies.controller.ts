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
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { movieInfoDto, movieUpdateDto } from './dto/create-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

    if (!Number.isInteger(order) || Number(order) !== 0 || Number(order) !== 1)
      return movies;

    // order = 1 - increase
    // order = 0 - not increase
    return movies.sort((a, b) =>
      Number(order) === 1 ? a.rating - b.rating : b.rating - a.rating,
    );
  }

  @Get(':id')
  async getMovie(@Param('id') id: string) {
    const movie = await this.moviesService.getMovieById(id);
    return movie;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createMovie(@Body() dto: movieInfoDto, @UploadedFile() image: any) {
    const movie = await this.moviesService.createMovie(dto, image);
    return movie;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateMovie(
    @Body() dto: movieUpdateDto,
    @UploadedFile() image: any,
    @Param('id') id: string,
  ) {
    const movie = this.moviesService.updateMovie(id, dto, image);
    return movie;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeMovie(@Param('id') id: string) {
    const movie = this.moviesService.removeMovie(id);
    return movie;
  }
}
