const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const sequelize = require('../db');
const jwt = require('jsonwebtoken');

let server;
let csrfToken;
let jwtToken;
let userId; 

beforeAll(async () => {
  server = app.listen(4000);

 
  await sequelize.sync({ force: true });

  const csrfRes = await request(server).get('/getCsrfToken');
  csrfToken = csrfRes.body.csrfToken;
 // console.log('CSRF Token:', csrfToken);


  const createdUser = await User.create({ name: 'Test', surname: 'User', email: 'test@example.com', password: 'password123' });
  userId = createdUser.id; 
  jwtToken = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  //console.log('JWT Token:', jwtToken);
});

afterAll(async () => {
  

});

describe('User API', () => {
  it('should check if surname is unique', async () => {
    const res = await request(server)
      .get('/users/check-surname/Johnson')
      .set('X-XSRF-TOKEN', csrfToken)
      .set('Authorization', `Bearer ${jwtToken}`);

    console.log('Response for check surname:', res.body);
    expect(res.status).toBe(200);
  }, 10000);

  it('should retrieve a user by ID', async () => {
    const res = await request(server)
      .get(`/users/${userId}`)
      .set('X-XSRF-TOKEN', csrfToken)
      .set('Authorization', `Bearer ${jwtToken}`);

    console.log('Response for retrieve user:', res.body);
    expect(res.status).toBe(200);
  }, 10000);

});
