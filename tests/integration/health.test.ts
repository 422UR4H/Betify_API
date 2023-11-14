import supertest from 'supertest';
import httpStatus from 'http-status';
import app from 'app';

const api = supertest(app);

describe('GET /health', () => {
  it("should return I'm OK! and 200 status code", async () => {
    const { status, text } = await api.get('/health');
    // const result = await api.get('/health');
    // console.log(result)
    expect(status).toBe(httpStatus.OK);
    expect(text).toBe("I'm OK!");
  });
});
