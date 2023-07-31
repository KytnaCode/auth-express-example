import type {Request, Response} from 'express';
import userModel from './userModel.js';
import logger from '../util/logger.js';
import UserModel from './userModel.js';
import hashText from '../util/hashText.js';

export const onGet = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find({ ...req.body }); // TODO: Validate user input

    res.status(200).json(user);
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);

    res.status(500).send('Internal Server Error');
  }
};

export const onPost = async (req: Request, res: Response) => {
  const user = new UserModel({...req.body}); // TODO: Validate user input

  try {
    user.password = hashText(user.password); // Hash password

    await user.save(); // Save user to database

    res.status(201).json(user);
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);

    res.status(500).send('Internal Server Error');
  }
};

export const onGetUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params['userId']);

    res.status(200).json(user);
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);

    res.status(500).send('Internal Server Error');
  }
};

export const onDeleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params['userId']);

    if (!user) return res.status(404).send('User not found');

    res.status(204).send('User deleted');
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);
    res.status(500).send('Internal Server Error');
  }
};

export const onPatchUser = async (req: Request, res: Response) => {
  try {
    if (req.body.password)
      req.body.password = hashText(req.body.password);

    const user = await UserModel.findByIdAndUpdate(req.params['userId'], { ...req.body }, {new: true}); // TODO: Validate user input

    res.status(200).json(user);
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);
    res.status(500).send('Internal Server Error');
  }
};

export const onPutUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params['userId'], req.body, {new: true}); // TODO: Validate user input

    if (!user) return res.status(404).send('User not found');

    res.status(200).json(user);
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);
    res.status(500).send('Internal Server Error');
  }
};