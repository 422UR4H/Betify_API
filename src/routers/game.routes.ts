import { Router } from 'express';
import gameController from '@/controllers/game.controllers';
import validateSchema from '@/middlewares/validateSchema';
import { gameFinishSchema, gameSchema } from '@/schemas/game.schemas';

const router = Router();

router.get('/', gameController.findAll);
router.get('/:id', gameController.findById);
router.post('/', validateSchema(gameSchema), gameController.create);
router.post('/:id/finish', validateSchema(gameFinishSchema), gameController.finish);

export default router;
