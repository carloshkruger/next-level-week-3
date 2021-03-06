import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.delete('/orphanages/:id', OrphanagesController.delete);

routes.post('/users', UsersController.create);

routes.post('/sessions', SessionsController.create);

export default routes;
