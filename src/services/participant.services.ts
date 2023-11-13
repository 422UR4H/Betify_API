import { InputParticipantDto } from '@/protocols/participant.protocols';
import participantRepository from '@/repositories/participant.repository';
import { Participant } from '@prisma/client';

async function findAll() {
  return await participantRepository.findAll();
}

async function create(participant: InputParticipantDto): Promise<Participant> {
  return await participantRepository.create(participant);
}

const ParticipantService = { findAll, create };
export default ParticipantService;
