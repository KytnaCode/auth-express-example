import {model, Schema} from 'mongoose';

export interface User {
  _id: string
  name: string;
  email: string;
  password: string;
}

export const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    maxLength: 32,
    minLength: 6,
  },
  email: {
    type: String,
    maxLength: 100,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  }
});

export const userModel = model('User', userSchema);

export default userModel;