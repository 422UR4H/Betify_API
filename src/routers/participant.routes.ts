import { Router } from 'express';
import validateSchema from '@/middlewares/validateSchema';
import { participantSchema } from '@/schemas/participants.schemas';
import participantController from '@/controllers/participant.controllers';

const participantRouter = Router();

participantRouter.get('/participants', participantController.findAll);
participantRouter.post('/participants', validateSchema(participantSchema), participantController.create);

export default participantRouter;
