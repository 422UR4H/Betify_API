import { Request, Response } from 'express';
import { InputParticipantDto } from '@/protocols/participant.protocols';
import participantService from '@/services/participant.services';
import httpStatus from 'http-status';

async function findAll(_req: Request, res: Response) {
  const participants = await participantService.findAll();
  return res.send(participants);
}

async function create(req: Request, res: Response) {
  const inputParticipantDto = req.body as InputParticipantDto;
  const participant = await participantService.create(inputParticipantDto);
  return res.status(httpStatus.CREATED).send(participant);
}

const participantController = { findAll, create };
export default participantController;
