import {NextFunction, Request, Response} from 'express';
import {JWTPayload, jwtVerify, errors} from 'jose';
import logger from '../util/logger.js';
import UserModel from '../users/userModel.js';

const {JWTExpired, JWTInvalid} = errors;

const requireAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // get tokens from header, remove 'Bearer' from token

  if (!token) return res.status(401).send({error: 'You must log in!'}); // if no token, return error

  const secret = new TextEncoder().encode(process.env['JWT_SECRET']!); // encode secret

  let payload: JWTPayload;

  try {
    payload = (await jwtVerify(token, secret)).payload; // verify token
  } catch (e) {
    const error = e as Error;

    // if token is invalid or expired, return error
    if (error instanceof JWTInvalid) return res.status(401).send({error: 'Invalid token'});
    if (error instanceof JWTExpired) return res.status(401).send({error: 'Expired token'});

    logger.warn(error.message);

    return res.status(401).send({error: 'You must log in!'}); // if any other error, return error
  }

  const user = await UserModel.findById(payload.id);

  if (!user) return res.status(401).send({error: 'You must log in!'}); // if no user, return error

  req.user = user;

  next(); // if all is good, continue
};

export default requireAuthMiddleware;