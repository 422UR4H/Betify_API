import supertest from 'supertest';
import httpStatus from 'http-status';
import participantFactory from '../factories/participant.factory';
import { cleanDB } from '../helpers';
import app from 'app';

const api = supertest(app);

beforeEach(async () => {
  await cleanDB();
});

describe('POST /participants', () => {
  it('should return status 422 when body is invalid', async () => {
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

describe('GET /participants', () => {
  it('should return all participants', async () => {
    const { status: status1, body: participantsVoid } = await api.get('/participants');
    expect(participantsVoid).toHaveLength(0);
    expect(status1).toEqual(httpStatus.OK);

    const participant1 = await participantFactory.buildRandom();
    const { status: status2, body: oneParticipant } = await api.get('/participants');
    expect(status2).toEqual(httpStatus.OK);
    expect(oneParticipant).toHaveLength(1);
    expect(oneParticipant).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: participant1.id,
          name: participant1.name,
          balance: participant1.balance,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    );

    await participantFactory.buildRandom();
    await participantFactory.buildRandom();
    const { status: status3, body: participants } = await api.get('/participants');
    expect(status3).toBe(httpStatus.OK);
    expect(participants).toHaveLength(3);
    expect(participants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          balance: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    );
  });
});
