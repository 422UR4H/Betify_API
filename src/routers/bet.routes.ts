import betController from '@/controllers/bet.controllers';
import validateSchema from '@/middlewares/validateSchema';
import { betSchema } from '@/schemas/bet.schemas';
import { Router } from 'express';

const router = Router();

router.post('/bets', validateSchema(betSchema), betController.create);

export default router;
