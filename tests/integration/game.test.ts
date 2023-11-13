import supertest from 'supertest';
import httpStatus from 'http-status';
import app from 'app';
import gameFactory from '../factories/game.factory';
import { cleanDB } from '../helpers';

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
