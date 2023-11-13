import { Request, Response } from 'express';
import { InputParticipantDto } from '@/protocols/participants.protocols';
import ParticipantService from '@/services/participant.service';
import httpStatus from 'http-status';

async function create(req: Request, res: Response) {
  const participant = req.body as InputParticipantDto;
  await ParticipantService.create(participant);
  return res.sendStatus(httpStatus.CREATED);
}

const ParticipantController = { create };
export default ParticipantController;
