import { InputParticipantDto } from '@/protocols/participants.protocols';
import participantRepository from '@/repositories/participant.repository';

async function create(participant: InputParticipantDto) {
  await participantRepository.create(participant);
}

const ParticipantService = { create };
export default ParticipantService;
