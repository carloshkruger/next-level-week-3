import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import User from '../models/User';
import UserView from '../views/users.view';

export default {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const data = {
      email,
      password,
    };

    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      email,
    });

    if (!user) {
      return response.status(400).json({
        message: 'E-mail e/ou senha incorreto(s).',
      });
    }

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      return response.status(400).json({
        message: 'E-mail e/ou senha incorreto(s).',
      });
    }

    const payload = {
      userId: user.id,
    };

    const token = sign(payload, authConfig.privateKey);

    return response.status(200).json({ token, user: UserView.render(user) });
  },
};
