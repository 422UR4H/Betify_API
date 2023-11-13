import { InputParticipantDto, OutputParticipantDto } from '@/protocols/participant.protocols';
import participantRepository from '@/repositories/participant.repository';

async function findAll(): Promise<OutputParticipantDto[]> {
  return await participantRepository.findAll();
}

async function create(participant: InputParticipantDto): Promise<OutputParticipantDto> {
  return await participantRepository.create(participant);
}

const ParticipantService = { findAll, create };
export default ParticipantService;
