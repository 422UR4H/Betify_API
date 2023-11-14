import healthController from '@/controllers/health.controllers';
import { Router } from 'express';

const router = Router();

router.get('/health', healthController.get);

export default router;
