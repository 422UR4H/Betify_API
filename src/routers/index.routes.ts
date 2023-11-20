import { Router } from 'express';
import healthRouter from './health.routes';
import participantRouter from './participant.routes';
import gameRouter from './game.routes';
import betRouter from './bet.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/participants', participantRouter);
router.use('/games', gameRouter);
router.use('/bets', betRouter);

export default router;
