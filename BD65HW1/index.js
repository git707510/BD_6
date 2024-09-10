let express = require('express');
let app = express();
app.use(express.json());

// ------------------ sample database ---------------------
const games = [];
const tournaments = [];

// ------------------- Exercise 1: Add a New Game -----------------------
function validateGame(game) {
  if (!game.title || typeof game.title !== 'string') {
    return 'title is required and should be string!';
  }

  if (!game.genre || typeof game.genre !== 'string') {
    return 'genre is required and should be string!';
  }
  return null;
}

app.post('/api/games', (req, res) => {
  try {
    let error = validateGame(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    const game = { id: games.length + 1, ...req.body };

    games.push(game);
    return res.status(201).json(game);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ------------------- Exercise 2: Add a New Tournament -----------------------
function validateTournament(tournament) {
  if (!tournament.name || typeof tournament.name !== 'string') {
    return 'name is required and should be string!';
  }

  if (!tournament.gameId || typeof tournament.gameId !== 'number') {
    return 'gameId is required and should be number!';
  }
  return null;
}

app.post('/api/tournaments', (req, res) => {
  try {
    let error = validateTournament(req.body);
    if (error) {
      return res.status(400).send(error);
    }

    const tournament = { id: tournaments.length + 1, ...req.body };

    tournaments.push(tournament);
    return res.status(201).json(tournament);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = { app, validateGame, validateTournament };
