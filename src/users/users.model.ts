import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
}

export const UserSchema = new Schema<User>({
  email: String,
  password: String,
});

export const UserModel = model<User>('User', UserSchema);
