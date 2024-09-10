const express = require('express');
const app = express();

app.use(express.json());

//----------------------- Sample Data ---------------------------
let articles = [
  {
    id: 1,
    title: 'Understanding JavaScript',
    content:
      'JavaScript is a versatile language used for both frontend and backend development.',
  },
  {
    id: 2,
    title: 'Introduction to React',
    content:
      'React is a popular JavaScript library for building user interfaces.',
  },
];

let authors = [
  {
    id: 1,
    name: 'John Doe',
    articleId: 1,
  },
  {
    id: 2,
    name: 'Jane Smith',
    articleId: 2,
  },
];

// --------------- Exercise 1 : Add a New Article -------------------
function validateArticles(article) {
  if (!article.title || typeof article.title !== 'string') {
    return 'Title is required and should be string';
  }
  if (!article.content || typeof article.content !== 'string') {
    return 'Content is required and should be string';
  }
  return null;
}

app.post('/articles', (req, res) => {
  const error = validateArticles(req.body);
  if (error) return res.status(400).json(error);

  const article = { id: articles.length + 1, ...req.body };

  articles.push(article);
  res.status(201).json(article);
});

// --------------- Exercise 2: Add a New Author -------------------

function validateAuthor(author) {
  if (!author.name || typeof author.name !== 'string') {
    return 'author name is required and should be string.';
  }
  if (!author.articleId || typeof author.articleId !== 'number') {
    return 'article Id is required and should be number';
  }
  return null;
}

app.post('/authors', (req, res) => {
  const error = validateAuthor(req.body);
  if (error) return res.status(400).json(error);

  const article = { id: authors.length + 1, ...req.body };

  authors.push(article);

  return res.status(201).json(article);
});

module.exports = { app, validateAuthor, validateArticles };
