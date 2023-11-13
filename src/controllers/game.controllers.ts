import { InputGameDto } from '@/protocols/game.protocols';
import gameService from '@/services/game.services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function create(req: Request, res: Response) {
  const inputGameDto = req.body as InputGameDto;
  const game = await gameService.create(inputGameDto);
  return res.status(httpStatus.CREATED).send(game);
}

const gameController = { create };
export default gameController;
