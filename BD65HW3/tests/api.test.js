const { app, validateArticles, validateAuthor } = require('../index.js');

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  validateAuthor: jest.fn(),
  validateArticles: jest.fn(),
}));

const http = require('http');
const request = require('supertest');

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3002, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Test apis', () => {
  // ------------- Exercise 3: Test Add a New Article with Valid Input -----------
  it('should add a new article with valid input', async () => {
    const response = await request(server).post('/articles').send({
      title: 'Mastering Node.js',
      content: 'Node.js is a powerful tool for backend development...',
    });

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual({
      id: 3,
      title: 'Mastering Node.js',
      content: 'Node.js is a powerful tool for backend development...',
    });
  });

  // ------------- Exercise 4: Test Add a New Article with Invalid Input -----------
  it('should return error message when add a new article with invalid input', async () => {
    const response1 = await request(server).post('/articles').send({
      title: 1,
      content: 'Node.js is a powerful tool for backend development...',
    });
    expect(response1.status).toBe(400);
    expect(response1.body).toEqual('Title is required and should be string');

    const response2 = await request(server).post('/articles').send({
      title: 'Mastering Node.js',
      content: '',
    });
    expect(response2.statusCode).toBe(400);
    expect(response2.body).toEqual('Content is required and should be string');
  });

  // ------------- Exercise 5: Test Add a New Author with Valid Input -----------
  it('should add a new author record with valid input.', async () => {
    const response = await request(server).post('/authors').send({
      name: 'Alice Johnson',
      articleId: 3,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 3,
      name: 'Alice Johnson',
      articleId: 3,
    });
  });

  // ------------- Exercise 6: Test Add a New Author with Invalid Input -----------
  it('should return error message when add a new author with invalid input.', async () => {
    const response1 = await request(server).post('/authors').send({
      name: '',
      articleId: 3,
    });

    expect(response1.status).toBe(400);
    expect(response1.body).toEqual(
      'author name is required and should be string.'
    );

    const response2 = await request(server).post('/authors').send({
      name: 'Alice Johnson',
      articleId: '3',
    });

    expect(response2.status).toBe(400);
    expect(response2.body).toEqual(
      'article Id is required and should be number'
    );
  });
});

describe('Test mock functions', () => {
  //----------- Exercise 7: Test Article Validation Function with Jest Mocks -----------
  it('should return null when validateArticle function is called with the correct arguments.', () => {
    validateArticles.mockReturnValue(null);
    expect(
      validateArticles({
        title: 'Mastering Node.js',
        content: 'Node.js is a powerful tool for backend development...',
      })
    ).toBeNull();
  });

  //----------- Exercise 8: Test Article Validation Function Error Handling with Jest Mocks -----------
  it('should return error message for invalid input.', () => {
    validateArticles.mockReturnValue('Title is required and should be string');
    expect(
      validateArticles({
        title: '',
        content: 'Node.js is a powerful tool for backend development...',
      })
    ).toBe('Title is required and should be string');
  });

  //----------- Exercise 9: Test Author Validation Function with Jest Mocks -----------
  it('should return null when validateAuthor function is called with the correct arguments.', () => {
    validateAuthor.mockReturnValue(null);
    expect(
      validateAuthor({
        name: 'Alice Johnson',
        articleId: 3,
      })
    ).toBeNull();
  });

  //----------- Exercise 10: Test Author Validation Function Error Handling with Jest Mocks -----------
  it('should return error message for invalid input.', () => {
    validateAuthor.mockReturnValue(
      'author name is required and should be string.'
    );
    expect(
      validateAuthor({
        name: '',
        articleId: 3,
      })
    ).toEqual('author name is required and should be string.');
  });
});
