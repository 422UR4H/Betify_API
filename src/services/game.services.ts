import customErrors from '@/errors/customErrors';
import { InputGameDto, OutputGameDto } from '@/protocols/game.protocols';
import gameRepository from '@/repositories/game.repository';

async function findAll(): Promise<OutputGameDto[]> {
  return await gameRepository.findAll();
}

async function findById(id: number): Promise<OutputGameDto> {
  const game = await gameRepository.findById(id);
  if (!game) throw customErrors.notFound('Game');
  return game;
}

async function create(game: InputGameDto): Promise<OutputGameDto> {
  return await gameRepository.create(game);
}

const gameService = { findAll, findById, create };
export default gameService;
