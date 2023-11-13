import customErrors, { badRequest } from '@/errors/customErrors';
import { OutputBetDto } from '@/protocols/bet.protocols';
import { InputGameDto, OutputGameDto } from '@/protocols/game.protocols';
import gameRepository from '@/repositories/game.repository';

async function findAll(): Promise<OutputGameDto[]> {
  return await gameRepository.findAll();
}

// FIXME: type this
async function findById(id: number) {
  if (isNaN(id)) throw badRequest('id must be a positive non null integer');
  const game = await gameRepository.findById(id);

  if (!game) throw customErrors.notFound('Game');
  return game;
}

async function create(game: InputGameDto): Promise<OutputGameDto> {
  return await gameRepository.create(game);
}

const gameService = { findAll, findById, create };
export default gameService;
