import healthController from '@/controllers/health.controllers';
import { Router } from 'express';

const router = Router();

router.get('/', healthController.get);

export default router;
