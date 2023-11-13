import { InputParticipantDto } from '@/protocols/participants.protocols';
import participantRepository from '@/repositories/participant.repository';
import { Participant } from '@prisma/client';

async function create(participant: InputParticipantDto): Promise<Participant> {
  return await participantRepository.create(participant);
}

const ParticipantService = { create };
export default ParticipantService;
