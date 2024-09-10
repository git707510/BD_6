const { app, validateGame, validateTournament } = require('../index.js');

const http = require('http');
const request = require('supertest');

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('check API Endpoints to add data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ---------------- Exercise 3: Test Add a New Game with Valid Input -----------------
  it('should add new Game with Valid Input', async () => {
    const newGame = {
      title: 'The Legend of Zelda',
      genre: 'Adventure',
    };

    const result = await request(server).post('/api/games').send(newGame);

    expect(result.body).toEqual({ id: 1, ...newGame });
    expect(result.statusCode).toEqual(201);
  });

  // ---------------- Exercise 4: Test Add a New Game with Invalid Input ---------------
  it('should check Game with Invalid Input', async () => {
    const result1 = await request(server).post('/api/games').send({
      title: '',
      genre: 'Adventure',
    });
    expect(result1.status).toBe(400);

    expect(result1.body).toEqual('title is required and should be string!');

    const result2 = await request(server).post('/api/games').send({
      title: 'The Legend of Zelda',
      genre: '',
    });
    expect(result2.status).toBe(400);
    expect(result2.body).toEqual('genre is required and should be string!');
  });

  // ---------------- Exercise 5:Test Add a New Tournament with Valid Input ---------------
  it('should check add a new tournament with valid input', async () => {
    const tournament = {
      name: 'Zelda Championship',
      gameId: 1,
    };

    const result = await request(server)
      .post('/api/tournaments')
      .send(tournament);

    expect(result.status).toEqual(201);
    expect(result.body).toEqual({ id: 1, ...tournament });
  });

  // ---------------- Exercise 6: Test Add a New Tournament with Invalid Input ---------------
  it('should check, add a new tournament with invalid input', async () => {
    const result1 = await request(server).post('/api/tournaments').send({
      name: '',
      gameId: 1,
    });

    expect(result1.status).toBe(400);
    expect(result1.text).toEqual('name is required and should be string!');

    const result2 = await request(server).post('/api/tournaments').send({
      name: 'Zelda Championship',
      gameId: '',
    });
    expect(result2.status).toBe(400);
    expect(result2.text).toEqual('gameId is required and should be number!');
  });

  // ---------------- Exercise 7: Test Game Validation Function with Jest Mocks ---------------
  it('should verify that the validateGame function is called with the correct arguments and returns null for valid input', async () => {
    expect(
      validateGame({
        title: 'The Legend of Zelda',
        genre: 'Adventure',
      })
    ).toBeNull();
  });

  // ---------------- Exercise 8: Test Game Validation Function Error Handling with Jest Mocks ---------------
  it('should verify that the validateGame function returns an error message for invalid input.', async () => {
    expect(
      validateGame({
        title: '',
        genre: 'Adventure',
      })
    ).toEqual('title is required and should be string!');

    expect(
      validateGame({
        title: 'The Legend of Zelda',
        genre: '',
      })
    ).toEqual('genre is required and should be string!');
  });

  // ---------------- Exercise 9: Test Tournament Validation Function with Jest Mocks ---------------
  it('erify that the validateTournament function is called with the correct arguments and returns null for valid input', async () => {
    expect(
      validateTournament({
        name: 'Zelda Championship',
        gameId: 1,
      })
    ).toBeNull();
  });

  // ---------------- Exercise 10: Test Tournament Validation Function Error Handling with Jest Mocks ---------------
  it('should verify that the validateTournament function returns an error message for invalid input.', async () => {
    expect(
      validateTournament({
        name: '',
        gameId: 1,
      })
    ).toEqual('name is required and should be string!');

    expect(
      validateTournament({
        name: 'Zelda Championship',
        gameId: '',
      })
    ).toEqual('gameId is required and should be number!');
  });
});
