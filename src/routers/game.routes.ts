import gameController from '@/controllers/game.controllers';
import validateSchema from '@/middlewares/validateSchema';
import { gameSchema } from '@/schemas/game.schemas';
import { Router } from 'express';

const router = Router();

router.get('/games', gameController.findAll);
router.post('/games', validateSchema(gameSchema), gameController.create);

export default router;
