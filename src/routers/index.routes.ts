import { Router } from 'express';
import healthRouter from './health.routes';
import participantRouter from './participant.routes';
import gameRouter from './game.routes';
import betRouter from './bet.routes';

const router = Router();

router.use(healthRouter);
router.use(participantRouter);
router.use(gameRouter);
router.use(betRouter);

export default router;
