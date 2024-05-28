// tests/user.test.js

const request = require('supertest');
const app = require('express');  // Assurez-vous que c'est le bon chemin vers votre application Express
const  User  = require('../models/user');  // Assurez-vous que c'est le bon chemin vers votre modèle

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', surname: 'Johnson', email: 'alice@example.com', password: 'password123' });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'Alice');
    expect(res.body).toHaveProperty('surname', 'Johnson');
    expect(res.body).toHaveProperty('email', 'alice@example.com');
  },10000);

  it('should check if username is unique', async () => {
    const res = await request(app).get('/users/checkUsernameUnique/Smith');
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('exists', true);
  },10000);

  it('should retrieve all users', async () => {
    const res = await request(app).get('/users');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(3);  // assuming at least the 3 seeded users
  },10000);

  it('should retrieve a user by ID', async () => {
    const user = await User.findOne({ where: { email: 'john@example.com' } });
    const res = await request(app).get(`/users/${user.id}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'John');
  },10000);

  it('should update a user', async () => {
    const user = await User.findOne({ where: { email: 'jane@example.com' } });
    const res = await request(app)
      .put(`/users/${user.id}`)
      .send({ name: 'Jane Updated' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Jane Updated');
  },10000);

  it('should delete a user', async () => {
    const user = await User.findOne({ where: { email: 'bob@example.com' } });
    const res = await request(app).delete(`/users/${user.id}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'User deleted');
  },10000);
});