import { Router } from 'express';
import validateSchema from '@/middlewares/validateSchema';
import { participantSchema } from '@/schemas/participants.schemas';
import ParticipantController from '@/controllers/participant.controller';

const participantRouter = Router();

participantRouter.post('/participants', validateSchema(participantSchema), ParticipantController.create);
export default participantRouter;
