import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputBetDto } from '@/protocols/bet.protocols';
import betService from '@/services/bet.services';

async function create(req: Request, res: Response) {
  const bet = req.body as InputBetDto;
  const newBet = await betService.createAndLiquidadePayment(bet);
  res.status(httpStatus.CREATED).send(newBet);
}

const betController = { create };
export default betController;
