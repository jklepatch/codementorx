const request = require('supertest');
const app = require('../app');

describe('users endpoint', () => {
  it('should create a user', async () => {
    const resp = await request(app)
      .post('/users')
      .send({email: 'a@a.com', name: 'name', password: 'Password1'})
      .expect(201)
    expect(resp.body.jwt).toEqual('jwt');
    expect(resp.body.refresh_token).toEqual('refresh_token');
  });

  it('should NOT create a user if incorrect input', async () => {
      let resp = await request(app)
        .post('/users')
        .send({email: 'a@a.com', password: 'Password1'})
        .expect(422)
      expect(resp.body.errors.length).toEqual(1);

      resp = await request(app)
        .post('/users')
        .send({name: 'name', password: 'Password1'})
        .expect(422)
      expect(resp.body.errors.length).toEqual(1);

      resp = await request(app)
        .post('/users')
        .send({email: 'a@a.com', name: 'name' })
        .expect(422)
      expect(resp.body.errors.length).toEqual(1);

      resp = await request(app)
        .post('/users')
        .send({})
        .expect(422)
      expect(resp.body.errors.length).toEqual(3);

      //password missing a letter
      resp = await request(app)
        .post('/users')
        .send({email: 'a@a.com', name: 'name', password: 'Password'})
        .expect(422)
      expect(resp.body.errors.length).toEqual(1);

      //password missing uppercase
      resp = await request(app)
        .post('/users')
        .send({email: 'a@a.com', name: 'name', password: 'password1'})
        .expect(422)
      expect(resp.body.errors.length).toEqual(1);

      //password too short 
      resp = await request(app)
        .post('/users')
        .send({email: 'a@a.com', name: 'name', password: 'Pa1'})
        .expect(422)
      expect(resp.body.errors.length).toEqual(1);
  });
});
