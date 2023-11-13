import { Request, Response } from 'express';
import { InputParticipantDto } from '@/protocols/participants.protocols';
import ParticipantService from '@/services/participant.service';
import httpStatus from 'http-status';
import { Participant } from '@prisma/client';

async function findAll(_req: Request, res: Response) {
  const participants = await ParticipantService.findAll();
  return res.send(participants);
}

async function create(req: Request, res: Response) {
  const inputParticipantDto = req.body as InputParticipantDto;
  const participant: Participant = await ParticipantService.create(inputParticipantDto);
  return res.status(httpStatus.CREATED).send(participant);
}

const ParticipantController = { findAll, create };
export default ParticipantController;
