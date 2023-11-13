import { InputGameDto } from '@/protocols/game.protocols';
import gameService from '@/services/game.services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function findAll(_req: Request, res: Response) {
  const games = await gameService.findAll();
  return res.send(games);
}

async function create(req: Request, res: Response) {
  const inputGameDto = req.body as InputGameDto;
  const game = await gameService.create(inputGameDto);
  return res.status(httpStatus.CREATED).send(game);
}

const gameController = { findAll, create };
export default gameController;
