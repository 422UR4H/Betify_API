import { Router } from 'express';
import betController from '@/controllers/bet.controllers';
import validateSchema from '@/middlewares/validateSchema';
import { betSchema } from '@/schemas/bet.schemas';

const router = Router();

router.post('/', validateSchema(betSchema), betController.create);

export default router;
