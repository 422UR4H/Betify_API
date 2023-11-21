import supertest from 'supertest';
import httpStatus from 'http-status';
import app from 'app';
import gameFactory from '../factories/game.factory';
import { cleanDB } from '../helpers';
import participantFactory from '../factories/participant.factory';
import betFactory from '../factories/bet.factory';
import { GameWithBets, InputFinishGameDto } from '@/protocols/game.protocols';
import { TIMEOUT_FINISH_GAME_TEST } from '@/utils/constants.utils';
import { Participant } from '@prisma/client';

const api = supertest(app);

beforeEach(async () => {
  await cleanDB();
});

describe('POST /games', () => {
  it('should return status 422 when body is invalid', async () => {
    const response = await api.post('/games').send({ homeTeamName: 'palmeiras' });
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    const response2 = await api.post('/games').send({ awayTeamName: 'flamengo' });
    expect(response2.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    const response3 = await api.post('/games').send({ homeTeamName: 'flamengo', awayTeamName: 3 });
    expect(response3.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should return a 201 status code and game created when body is valid', async () => {
    const { status, body } = await api.post('/games').send({
      homeTeamName: 'gremio',
      awayTeamName: 'flamengo',
    });
    expect(status).toBe(httpStatus.CREATED);
    expect(body).toEqual({
      id: expect.any(Number),
      homeTeamName: 'gremio',
      awayTeamName: 'flamengo',
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

describe('GET /games', () => {
  it('should return all games', async () => {
    const { status: status1, body: gamesVoid } = await api.get('/games');
    expect(gamesVoid).toHaveLength(0);
    expect(status1).toEqual(httpStatus.OK);

    const game1 = await gameFactory.buildRandom();
    const { status: status2, body: oneGame } = await api.get('/games');
    expect(status2).toEqual(httpStatus.OK);
    expect(oneGame).toHaveLength(1);
    expect(oneGame).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: game1.id,
          homeTeamName: game1.homeTeamName,
          awayTeamName: game1.awayTeamName,
          homeTeamScore: 0,
          awayTeamScore: 0,
          isFinished: false,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    );

    await gameFactory.buildRandom();
    await gameFactory.buildRandom();
    const { status: status3, body: games } = await api.get('/games');
    expect(status3).toBe(httpStatus.OK);
    expect(games).toHaveLength(3);
    expect(games).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          homeTeamName: expect.any(String),
          awayTeamName: expect.any(String),
          homeTeamScore: 0,
          awayTeamScore: 0,
          isFinished: false,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    );
  });
});

describe('GET /games/:id', () => {
  it('should return status 400 when id is invalid', async () => {
    const { status, text } = await api.get('/games/batata');
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(text).toBe('id must be a positive non null integer');
  });

  it('should return 404 when game does not exists', async () => {
    const { status, text } = await api.get('/games/1');
    expect(status).toBe(httpStatus.NOT_FOUND);
    expect(text).toBe('Game does not exist');
  });

  it('should return one game when given a valid and existing id', async () => {
    const game = await gameFactory.buildRandom();
    const { status, body } = await api.get(`/games/${game.id}`);
    expect(status).toBe(httpStatus.OK);
    expect(body).toEqual(
      expect.objectContaining({
        id: game.id,
        homeTeamName: game.homeTeamName,
        awayTeamName: game.awayTeamName,
        homeTeamScore: 0,
        awayTeamScore: 0,
        isFinished: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });
});

describe('POST /games/:id/finish', () => {
  const validBody: InputFinishGameDto = {
    homeTeamScore: 2,
    awayTeamScore: 2,
  };

  it('should return status 422 when body is not sent', async () => {
    const { status } = await api.post('/games/batata/finish');
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should return status 422 when body is in invalid format', async () => {
    const invalidBody: any = {
      homeTeamScores: 2,
      awayTeamScore: 0,
    };
    const { status } = await api.post('/games/batata/finish').send(invalidBody);
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should return status 422 when body is invalid', async () => {
    const invalidBody: InputFinishGameDto = {
      homeTeamScore: 2,
      awayTeamScore: null!,
    };
    const { status } = await api.post('/games/batata/finish').send(invalidBody);
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should return status 422 when body is sent incompleted', async () => {
    const invalidBody: any = {
      homeTeamScore: 2,
    };
    const { status } = await api.post('/games/batata/finish').send(invalidBody);
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should return status 400 when id is invalid', async () => {
    const { status, text } = await api.post('/games/batata/finish').send(validBody);
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(text).toBe('id must be a positive non null integer');
  });

  it('should return 404 when game does not exists', async () => {
    const { status, text } = await api.post('/games/1/finish').send(validBody);
    expect(status).toBe(httpStatus.NOT_FOUND);
    expect(text).toBe('Game does not exist');
  });

  it('should return 409 when game already finished', async () => {
    const { id } = await gameFactory.buildRandom();
    await api.post(`/games/${id}/finish`).send(validBody);

    const { status, text } = await api.post(`/games/${id}/finish`).send(validBody);
    expect(status).toBe(httpStatus.CONFLICT);
    expect(text).toBe('Game is already finished');
  });

  it(
    'should return 200 and one game when given a valid and existing id',
    async () => {
      const game = await gameFactory.buildRandom();
      const participantList = await participantFactory.buildRandomList(3);
      const [participant1, participant2, participant3] = participantList;
      // const participant1 = await participantFactory.buildRandom();
      // const participant2 = await participantFactory.buildRandom();
      // const participant3 = await participantFactory.buildRandom();
      await betFactory.build(2, 2, participant1.id, 1000, game.id);
      await betFactory.build(2, 2, participant2.id, 2000, game.id);
      await betFactory.build(3, 1, participant3.id, 3000, game.id);
      const { status, body } = await api.post(`/games/${game.id}/finish`).send(validBody);

      expect(status).toBe(httpStatus.OK);
      expect(body).toEqual(
        expect.objectContaining({
          id: game.id,
          homeTeamName: game.homeTeamName,
          awayTeamName: game.awayTeamName,
          homeTeamScore: validBody.homeTeamScore,
          awayTeamScore: validBody.awayTeamScore,
          isFinished: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
      const gameResponse = await api.get(`/games/${game.id}`);
      // const participantsResponse = await api.get(`/participants`);
      // only tests if response is sent successfully to isolate the /games/:id/finish endpoint
      if (!!gameResponse?.body) validateAmountWonBets(gameResponse.body as GameWithBets, participantList);
      // if (!!participantsResponse?.body) validateBalances(participantsResponse.body as Participant[], participantList);
    },
    TIMEOUT_FINISH_GAME_TEST,
  );
});

function validateAmountWonBets(gameFinished: GameWithBets, participantList: Participant[]) {
  const participants = { id1: participantList[0].id, id2: participantList[1].id, id3: participantList[2].id };
  const { Bet: bets } = gameFinished;

  bets.forEach((bet) => {
    switch (bet.participantId) {
      case participants.id1:
        expect(bet.amountWon).toBe(1400);
        break;
      case participants.id2:
        expect(bet.amountWon).toBe(2800);
        break;
      case participants.id3:
        expect(bet.amountWon).toBe(0);
        break;
    }
  });
}

// function validateBalances(participantUpdated: Participant[], participantList: Participant[]) {
//   const participants = { id1: participantList[0].id, id2: participantList[1].id, id3: participantList[2].id };

//   participantUpdated.forEach((p) => {
//     switch (p.id) {
//       case participants.id1:
//         expect(p.balance).toBe(p.balance - 1000 + 1400);
//         break;
//       case participants.id2:
//         expect(p.balance).toBe(p.balance - 2000 + 2800);
//         break;
//         case participants.id3:
//         expect(p.balance).toBe(p.balance - 3000);
//         break;
//     }
//   });
// }
