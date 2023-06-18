import { Schema, Document, model } from 'mongoose';

export interface Movie extends Document {
  title: string;
  description: string;
  image: string;
  rating: number;
}

export const MovieSchema = new Schema<Movie>({
  title: String,
  description: String,
  image: String,
  rating: Number,
});

export const MovieModel = model<Movie>('Movie', MovieSchema);
