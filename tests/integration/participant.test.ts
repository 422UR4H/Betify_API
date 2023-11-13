import supertest from 'supertest';
import httpStatus from 'http-status';
import app from 'app';
import { cleanDB } from '../helpers';
// import participantFactory from '../factories/participant.factory';

const api = supertest(app);

beforeEach(async () => {
  await cleanDB();
});

describe('POST /participants', () => {
  it('should return status 422 when data is invalid', async () => {
    const response = await api.post('/participants').send({ name: 'banana' });
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    const response2 = await api.post('/participants').send({ balance: 1.99 });
    expect(response2.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    const response3 = await api.post('/participants').send({ name: 'paula', balance: -1 });
    expect(response3.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should return a 201 status code and participant when name and balance is valid', async () => {
    const { status, body } = await api.post('/participants').send({ name: 'banana', balance: 9876500 });
    expect(status).toBe(httpStatus.CREATED);
    expect(body).toEqual({
        name: 'banana',
        balance: 9876500,
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
    });
  });
});

// describe('GET /participants', () => {
//   it('should return status 404 when participant doesnt exists', async () => {
//     const response = await api.get('/participants/32');
//     expect(response.status).toBe(404);
//   });

//   it('should return status 400 when id is invalid', async () => {
//     const response = await api.get('/participants/batata');
//     expect(response.status).toBe(400);
//   });

//   it('should return one participant when given a valid and existing id', async () => {
//     const participant = await participantFactory.build('banana', 1.99);
//     const response = await api.get(`/participants/${participant.id}`);
//     expect(response.body).toEqual(participant);
//   });

//   it('should return all participants if no id is present', async () => {
//     const participant1 = await participantFactory.buildRandom();
//     const participant2 = await participantFactory.buildRandom();
//     const participant3 = await participantFactory.buildRandom();
//     const response = await api.get('/participants');
//     expect(response.body).toEqual(expect.arrayContaining([participant1, participant2, participant3]));
//   });
// });
