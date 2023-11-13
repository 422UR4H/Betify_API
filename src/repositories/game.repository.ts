import prisma from '@/database/db.connection';
import { InputGameDto } from '@/protocols/game.protocols';

function create(data: InputGameDto) {
  return prisma.game.create({ data });
}

const gameRepository = { create };
export default gameRepository;
