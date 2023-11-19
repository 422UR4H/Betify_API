import prisma from '@/database/db.connection';
import { InputBetDto } from '@/protocols/bet.protocols';

async function create(data: InputBetDto) {
  return prisma.bet.create({ data });
}

const betRepository = { create };
export default betRepository;
