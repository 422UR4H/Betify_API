import { InputGameDto, OutputGameDto } from '@/protocols/game.protocols';
import gameRepository from '@/repositories/game.repository';

async function create(game: InputGameDto): Promise<OutputGameDto> {
  return await gameRepository.create(game);
}

const gameService = { create };
export default gameService;
