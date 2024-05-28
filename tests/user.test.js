// tests/user.test.js
const request = require('supertest');
const app = require('../app');
const { User, sequelize } = require('../models');

let server;
let csrfToken;
let token;

beforeAll(async () => {
  server = app.listen(4000);

  // Sincronizar todos los modelos
  await sequelize.sync({ force: true });

  const res = await request(server).get('/getCsrfToken');
  csrfToken = res.body.csrfToken;

  // Crear un usuario de prueba y obtener un token
  await User.create({ name: 'Test', surname: 'User', email: 'test@example.com', password: 'password123' });
  const loginRes = await request(server)
    .post('/login')
    .send({ email: 'test@example.com', password: 'password123' });
  token = loginRes.body.token;
});

afterAll(async () => {
  await User.destroy({ where: { email: 'test@example.com' } });
  await sequelize.close();
  await server.close();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(server)
      .post('/users')
      .set('X-XSRF-TOKEN', csrfToken)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Alice', surname: 'Johnson', email: 'alice@example.com', password: 'password123' });
    expect(res.status).toBe(201);
  }, 10000);

  it('should check if username is unique', async () => {
    const res = await request(server)
      .get('/users/check-surname/Johnson')
      .set('X-XSRF-TOKEN', csrfToken);
    expect(res.status).toBe(200);
  }, 10000);

  it('should retrieve a user by ID', async () => {
    const user = await User.findOne({ where: { email: 'test@example.com' } });
    const res = await request(server)
      .get(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('X-XSRF-TOKEN', csrfToken);
    expect(res.status).toBe(200);
  }, 10000);
});
