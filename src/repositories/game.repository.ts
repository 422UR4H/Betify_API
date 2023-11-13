import prisma from '@/database/db.connection';
import { InputGameDto } from '@/protocols/game.protocols';

function create(data: InputGameDto) {
  return prisma.game.create({ data });
}

function findAll() {
  return prisma.game.findMany();
}

const gameRepository = { findAll, create };
export default gameRepository;
