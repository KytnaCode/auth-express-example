import type {Request, Response} from 'express';
import UserModel from '../users/userModel.js';
import logger from '../util/logger.js';
import hashText from '../util/hashText.js';
import {createToken} from './auth.util.js';

export const register = async (req: Request, res: Response) => {
  const user = new UserModel({...req.body}); // TODO: Validate user input

  try {
    user.password = hashText(user.password); // Hash password

    await user.save(); // Save user to database

    res.status(201).json({
      user,
      token: await createToken(user)
    });
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);

    res.status(500).send('Internal Server Error');
  }
};

export const login = async (req: Request, res: Response) => {
  // TODO: Validate user input
  const email = req.body.email;
  const password = req.body.password;

  if (!password) return res.status(400).json({message: 'Bad Request', error: 'Password is required'});

  if (!email) return res.status(400).json({message: 'Bad Request', error: 'Email is required'});

  try {
    const user = await UserModel.findOne({email}); // Get user by email

    if (!user) return res.status(404).json({message: 'Not Found', error: 'User not found'}); // If user not found, return 404

    // Compare password hashes
    if (hashText(password) !== user.password) return res.status(401).json({
      message: 'Unauthorized',
      error: 'Invalid password'
    });
    
    res.status(200).json({token: await createToken(user)});
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);

    res.status(500).send('Internal Server Error');
  }
};