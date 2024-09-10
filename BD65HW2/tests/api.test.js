const { response } = require('express');
const { app, validateEmployee, validateCompany } = require('../index.js');

const http = require('http');
const request = require('supertest');

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  validateEmployee: jest.fn(),
  validateCompany: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll((done) => {
  server.close(done);
});

describe('Test Apis', () => {
  // --------- Exercise 3: Test Add a New Employee with Valid Input -------------
  it('should add a new employee with valid input', async () => {
    const response = await request(server).post('/api/employees').send({
      name: 'John Doe',
      companyId: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: 'John Doe',
      companyId: 1,
    });
  });

  // --------- Exercise 4: Test Add a New Employee with Invalid Input -------------
  it('should not add a New Employee with Invalid Input', async () => {
    const response1 = await request(server).post('/api/employees').send({
      name: '',
      companyId: 1,
    });
    expect(response1.status).toBe(400);
    expect(response1.body).toEqual({
      error: 'name is required and should be string',
    });

    const response2 = await request(server).post('/api/employees').send({
      name: 'John Doe',
      companyId: '',
    });
    expect(response2.statusCode).toEqual(400);
    expect(response2.body).toEqual({
      error: 'companyId is required and should be number',
    });
  });

  // --------- Exercise 5: Test Add a New Company with Valid Input -------------
  it('should add a new employee with valid input', async () => {
    const response = await request(server).post('/api/companies').send({
      name: 'TechCorp',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: 'TechCorp',
    });
  });

  // --------- Exercise 6: Test Add a New Company with Invalid I -------------
  it('should not add a New Employee with Invalid Input', async () => {
    const response = await request(server).post('/api/companies').send({
      name: '',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'Company name is required and should be string',
    });
  });
});

describe('Test funcions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //------ Exercise 7: Test Employee Validation Function with Jest Mocks------------
  it('should validate employee with valid input', async () => {
    validateEmployee.mockReturnValue(null);

    const response = validateEmployee({
      name: 'John Doe',
      companyId: 1,
    });

    expect(response).toBeNull();
  });

  //------ Exercise 8: Test Employee Validation Function Error Handling with Jest Mocks------------
  it('should valdate function error handling with jest mocks', () => {
    validateEmployee.mockReturnValue('name is required and should be string');

    expect(
      validateEmployee({
        name: '',
        companyId: 1,
      })
    ).toEqual('name is required and should be string');
  });

  //------ Exercise 9: Test Company Validation Function with Jest Mocks ------------
  it('should return null for valid input', () => {
    validateCompany.mockReturnValue(null);

    expect(
      validateCompany({
        name: 'TechCorp',
      })
    ).toBeNull();
  });

  //------ Exercise 10: Test Company Validation Function Error Handling with Jest Mocks ------------
  it('should return error message for invalid input.', () => {
    validateCompany.mockReturnValue(
      'Company name is required and should be string'
    );

    expect(
      validateCompany({
        name: '',
      })
    ).toEqual('Company name is required and should be string');
  });
});
