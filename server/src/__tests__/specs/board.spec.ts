import request from 'supertest';
import { app, server } from '../..';

afterAll(() => {
  server.close();
});

describe('POST /board', function () {
  it('should return created board', function (done) {
    request(app)
      .post('/board')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '3774')
      .expect(200, done);

    done();
  });
});

describe('GET /board/:boardId', function () {
  it('should return error when trying to get board with wrong id', function (done) {
    request(app)
      .get('/board/12')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, done);

    done();
  });
});
