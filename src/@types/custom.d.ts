import {User} from '../users/userModel.js';

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}