import { InputGameDto } from '@/protocols/game.protocols';
import gameService from '@/services/game.services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function findAll(_req: Request, res: Response) {
  const games = await gameService.findAll();
  res.send(games);
}

async function findById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const game = await gameService.findById(id);
  res.send(game);
}

async function create(req: Request, res: Response) {
  const inputGameDto = req.body as InputGameDto;
  const game = await gameService.create(inputGameDto);
  res.status(httpStatus.CREATED).send(game);
}

const gameController = { findAll, findById, create };
export default gameController;
