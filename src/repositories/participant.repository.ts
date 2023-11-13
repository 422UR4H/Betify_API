import prisma from '@/database/db.connection';
import { InputParticipantDto } from '@/protocols/participant.protocols';

function findAll() {
  return prisma.participant.findMany();
}

function findById(id: number) {
  return prisma.participant.findUnique({ where: { id } });
}

function create(data: InputParticipantDto) {
  return prisma.participant.create({ data });
}

function updateBalance(id: number, newBalance: number) {
  return prisma.participant.update({
    where: { id },
    data: { balance: newBalance },
  });
}

const participantRepository = { findAll, findById, create, updateBalance };
export default participantRepository;
