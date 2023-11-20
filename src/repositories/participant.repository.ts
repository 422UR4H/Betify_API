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

export function liquidatePayment(id: number, amountBet: number) {
  return prisma.participant.update({
    where: { id },
    data: { balance: { decrement: amountBet } },
  });
}

const participantRepository = { findAll, findById, create, liquidatePayment };
export default participantRepository;
