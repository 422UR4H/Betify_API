import prisma from '@/database/db.connection';
import { InputParticipantDto } from '@/protocols/participants.protocols';

function create(data: InputParticipantDto) {
  return prisma.participant.create({ data });
}

const participantRepository = { create };
export default participantRepository;
