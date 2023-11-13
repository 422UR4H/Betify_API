import gameController from '@/controllers/game.controllers';
import validateSchema from '@/middlewares/validateSchema';
import { gameFinishSchema, gameSchema } from '@/schemas/game.schemas';
import { Router } from 'express';

const router = Router();

router.get('/games', gameController.findAll);
router.get('/games/:id', gameController.findById);
router.post('/games', validateSchema(gameSchema), gameController.create);
router.post('/games/:id/finish', validateSchema(gameFinishSchema), gameController.finish);

export default router;
