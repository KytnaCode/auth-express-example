import type {Request, Response} from 'express';
import userModel from './userModel.js';
import logger from '../util/logger.js';
import UserModel from './userModel.js';
import forge from 'node-forge';

export const onGet = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const user = await userModel.find({ ...body });

    res.status(200).json(user);
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);

    res.status(500).send('Internal Server Error');
  }
};

export const onPost = async (req: Request, res: Response) => {
  const user = new UserModel({...req.body});

  try {
    const md = forge.md.sha256.create();

    user.password = md.update(user.password).digest().toHex();

    await user.save();

    res.status(201).json(user);
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);

    res.status(500).send('Internal Server Error');
  }
};

export const onGetUser = async (req: Request, res: Response) => {
  const id = req.params['userid'];

  if (!id) return res.status(400).send('Bad Request');

  try {
    const user = await UserModel.findById(id);

    res.status(200).json(user);
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);

    res.status(500).send('Internal Server Error');
  }
};

export const onDeleteUser = async (req: Request, res: Response) => {
  const id = req.params['userId'];

  if (!id) return res.status(400).send('Bad Request');

  try {
    await UserModel.findByIdAndDelete(id);

    res.status(200).send('User deleted');
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);
    res.status(500).send('Internal Server Error');
  }
};

export const onPatchUser = async (req: Request, res: Response) => {
  const id = req.params['userId'];

  if (!id) return res.status(400).send('Bad Request');

  try {
    const md = forge.md.sha256.create();

    if (req.body.password)
      req.body.password = md.update(req.body.password).digest().toHex();

    const user = await UserModel.findByIdAndUpdate(id, { ...req.body }, {new: true});

    res.status(200).json(user);
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);
    res.status(500).send('Internal Server Error');
  }
};

export const onPutUser = async (req: Request, res: Response) => {
  const id = req.params['userId'];

  if (!id) return res.status(400).send('Bad Request');

  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});

    res.status(200).json(user);
  } catch (e) {
    const error = e as Error;

    logger.warn(error.message);
    res.status(500).send('Internal Server Error');
  }
};