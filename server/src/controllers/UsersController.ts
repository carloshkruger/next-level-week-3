import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { hash } from 'bcrypt';

import User from '../models/User';

export default {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const repository = getRepository(User);

    const data = {
      name,
      email,
      password,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    data.password = await hash(data.password, 10);

    const user = repository.create(data);

    await repository.save(user);

    return response.status(201).send();
  },
};
