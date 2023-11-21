import supertest from 'supertest';
import httpStatus from 'http-status';
import { Status } from '@prisma/client';
import { cleanDB } from '../helpers';
import participantFactory from '../factories/participant.factory';
import gameFactory from '../factories/game.factory';
import app from 'app';
import { MAX_INT_32 } from '@/utils/constants.utils';
import { InputBetDto } from '@/protocols/bet.protocols';

const api = supertest(app);

beforeEach(async () => {
  await cleanDB();
});

describe('POST /bets', () => {
  const validBody: InputBetDto = {
    homeTeamScore: 0,
    awayTeamScore: 3,
    participantId: 1,
    amountBet: 100,
    gameId: 1,
  };

  it('should return status 422 when body is invalid', async () => {
    const response = await api.post('/bets').send({ homeTeamScore: 'palmeiras' });
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    const response2 = await api.post('/bets').send({ awayTeamScore: 1 });
    expect(response2.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    const response3 = await api.post('/bets').send({ ...validBody, amountBet: 's' });
    expect(response3.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should return status 404 when participant is not exist', async () => {
    const response = await api.post('/bets').send(validBody);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should return status 404 when game is not exist', async () => {
    const participant = await participantFactory.buildRandom();
    const response = await api.post('/bets').send({ ...validBody, participantId: participant.id });
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  describe('when body is valid, participant and game exists', () => {
    it('should return a 201 status code and bet created', async () => {
      const { id: participantId } = await participantFactory.buildRandom();
      const game = await gameFactory.buildRandom();

      const { status, body } = await api.post('/bets').send({
        ...validBody,
        participantId,
        gameId: game.id,
      });
      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual({
        id: expect.any(Number),
        homeTeamScore: 0,
        awayTeamScore: 3,
        amountBet: 100,
        status: Status.PENDING,
        amountWon: null,
        gameId: game.id,
        participantId,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
      // TODO: check that the balance is liquidated
    });

    // should be units, but to test the integration with errors, it was done here
    it('should return a 403 status code and bet created', async () => {
      const participant = await participantFactory.buildRandom();
      const game = await gameFactory.buildRandom();

      if (participant.balance >= MAX_INT_32) {
        participant.balance = MAX_INT_32 - 1;
      }
      const { status, text } = await api.post('/bets').send({
        ...validBody,
        amountBet: participant.balance + 1,
        participantId: participant.id,
        gameId: game.id,
      });
      expect(status).toBe(httpStatus.FORBIDDEN);
      expect(text).toBe("Participant doesn't have enough balance");
    });

    it('should return a 410 status code and bet created', async () => {
      const { id: participantId } = await participantFactory.buildRandom();
      const { id: gameId } = await gameFactory.buildRandomFinishedGame();

      const { status, text } = await api.post('/bets').send({
        ...validBody,
        participantId,
        gameId,
      });
      expect(status).toBe(httpStatus.GONE);
      expect(text).toBe('This game is already over');
    });
  });
});
