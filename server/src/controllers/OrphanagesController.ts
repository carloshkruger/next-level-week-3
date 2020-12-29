import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages.view';
import * as Yup from 'yup';

export default {
  async index(request: Request, response: Response) {
    const { approved = 'true' } = request.query;
    const repository = getRepository(Orphanage);

    const orphanages = await repository.find({
      relations: ['images'],
      where: {
        approved: approved === 'true',
      },
    });

    return response.status(200).json(OrphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Orphanage);

    const orphanage = await repository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.status(200).json(OrphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const repository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return {
        path: image.filename,
      };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
      approved: false,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required('Sobre é obrigatório').max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = repository.create(data);

    await repository.save(orphanage);

    return response.status(201).json(OrphanageView.render(orphanage));
  },

  async delete(request: Request, response: Response) {
    const id = Number(request.params.id);

    const repository = getRepository(Orphanage);

    const orphanage = repository.findOne({
      where: {
        id,
      },
    });

    if (!orphanage) {
      return response.status(400).json({ message: 'Orfanato não encontrado.' });
    }

    await repository.delete({
      id,
    });

    return response.status(200).send();
  },
};
