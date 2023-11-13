import { InputGameDto, OutputGameDto } from '@/protocols/game.protocols';
import gameRepository from '@/repositories/game.repository';

async function findAll(): Promise<OutputGameDto[]> {
  return await gameRepository.findAll();
}

async function create(game: InputGameDto): Promise<OutputGameDto> {
  return await gameRepository.create(game);
}

const gameService = { findAll, create };
export default gameService;
