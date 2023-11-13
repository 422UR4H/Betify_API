import prisma from '@/database/db.connection';
import { InputParticipantDto } from '@/protocols/participants.protocols';

function findAll() {
  return prisma.participant.findMany();
}

function create(data: InputParticipantDto) {
  return prisma.participant.create({ data });
}

const participantRepository = { findAll, create };
export default participantRepository;
