import { Request, Response } from 'express';
import { InputParticipantDto } from '@/protocols/participants.protocols';
import ParticipantService from '@/services/participant.service';
import httpStatus from 'http-status';
import { Participant } from '@prisma/client';

async function create(req: Request, res: Response) {
  const inputParticipantDto = req.body as InputParticipantDto;
  const participant: Participant = await ParticipantService.create(inputParticipantDto);
  return res.status(httpStatus.CREATED).send(participant);
}

const ParticipantController = { create };
export default ParticipantController;
