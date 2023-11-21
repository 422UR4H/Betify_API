import { Router } from 'express';
import healthController from '@/controllers/health.controllers';

const router = Router();

router.get('/', healthController.get);

export default router;
