// tests/authController.test.js
const { loginUser } = require('../controllers/loginUser');
const  User  = require('../models/user');
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthController.loginUser', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  it('should return a token if the credentials are correct', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword123'
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockToken');

    req.body = {
      email: 'test@example.com',
      password: 'password123'
    };

    await loginUser(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ token: 'mockToken' });
  });

  it('should return 401 if the user is not found', async () => {
    User.findOne.mockResolvedValue(null);

    req.body = {
      email: 'test@example.com',
      password: 'password123'
    };

    await loginUser(req, res);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'non valide' });
  });

  it('should return 401 if the password is incorrect', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword123'
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    req.body = {
      email: 'test@example.com',
      password: 'wrongpassword'
    };

    await loginUser(req, res);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'non valide' });
  });

  it('should return 500 if there is a server error', async () => {
    User.findOne.mockRejectedValue(new Error('Server error'));

    req.body = {
      email: 'test@example.com',
      password: 'password123'
    };

    await loginUser(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ message: 'Error interno del servidor' });
  });
});
