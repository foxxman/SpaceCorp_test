import { Schema, Document, model } from 'mongoose';

interface TokenCreationAttribute {
  userId: string;
  refreshToken: string;
}

export interface Token extends Document {
  userId: string;
  refreshToken: string;
}

export const TokenSchema = new Schema<Token>({
  userId: String,
  refreshToken: String,
});

export const TokenModel = model<Token>('Token', TokenSchema);
