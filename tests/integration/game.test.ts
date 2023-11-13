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

// describe('GET /games', () => {
//   it('should return all games', async () => {
//     const { status: status1, body: gamesVoid } = await api.get('/games');
//     expect(gamesVoid).toHaveLength(0);
//     expect(status1).toEqual(httpStatus.OK);

//     const participant1 = await gameFactory.buildRandom();
//     const { status: status2, body: oneParticipant } = await api.get('/games');
//     expect(status2).toEqual(httpStatus.OK);
//     expect(oneParticipant).toHaveLength(1);
//     expect(oneParticipant).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           id: participant1.id,
//           name: participant1.name,
//           balance: participant1.balance,
//           createdAt: expect.any(String),
//           updatedAt: expect.any(String),
//         }),
//       ]),
//     );

//     await gameFactory.buildRandom();
//     await gameFactory.buildRandom();
//     const { status: status3, body: games } = await api.get('/games');
//     expect(status3).toBe(httpStatus.OK);
//     expect(games).toHaveLength(3);
//     expect(games).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           id: expect.any(Number),
//           name: expect.any(String),
//           balance: expect.any(Number),
//           createdAt: expect.any(String),
//           updatedAt: expect.any(String),
//         }),
//       ]),
//     );
//   });
// });
