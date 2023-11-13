import { Router } from 'express';
import healthRouter from './health.routes';
import participantRouter from './participant.routes';

const router = Router();

router.use(healthRouter);
router.use(participantRouter);

export default router;
