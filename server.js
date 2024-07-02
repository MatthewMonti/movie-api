const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const passport = require('passport');

// Load environment variables
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.URL_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongoose Connected'))
  .catch((err) => { console.error(err); });

// Middleware
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
let allowedOrigins = [
  'http://localhost:8080', 
  'https://movies-flex-6e317721b427.herokuapp.com',
  'https://reel-cinema.netlify.app',
  'http://localhost:1234',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Authentication middleware
let auth = require('./auth.js')(app);

// Request logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Welcome message
app.get('/', (req, res) => {
  res.status(200).send("Welcome to myFlix Movie Database");
});

// About page
app.get('/about', (req, res) => {
  res.status(200).sendFile('./public/doc.html', { root: __dirname });
});

// Get all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movies = await Movies.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Search movies by title
app.get('/movies/title/:label', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const label = await Movies.find({ Title: req.params.label });
    if (label.length === 0) {
      res.status(404).send(req.params.label + ' movie title not found.');
    } else {
      res.status(200).json(label);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Search movies by release year
app.get('/movies/release/:year', async (req, res) => {
  try {
    const year = await Movies.find({ Release: req.params.year });
    if (year.length === 0) {
      res.status(404).send(req.params.year + ' film year not found.');
    } else {
      res.status(200).json(year);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Search movies by rated audience
app.get('/movies/rated/:audience', async (req, res) => {
  try {
    const audience = await Movies.find({ Rated: req.params.audience });
    if (audience.length === 0) {
      res.status(404).send(req.params.audience + ' demographic not found.');
    } else {
      res.status(200).json(audience);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Search movies by rating percentage
app.get('/movies/rating/:percentage', async (req, res) => {
  try {
    const percentage = await Movies.find({ Rating: req.params.percentage });
    if (percentage.length === 0) {
      res.status(404).send(req.params.percentage + ' rotten tomatoes percentage not found.');
    } else {
      res.status(200).json(percentage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Search movies by genre
app.get('/movies/genre/:genreName', async (req, res) => {
  try {
    const movies = await Movies.find({ 'Genre.Name': req.params.genreName });
    if (movies.length === 0) {
      res.status(404).send(req.params.genreName + ' category not found.');
    } else {
      res.status(200).json(movies);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Search movies by director
app.get('/movies/director/:name', async (req, res) => {
  try {
    const movies = await Movies.find({ 'Director.Name': req.params.name });
    if (movies.length === 0) {
      res.status(404).send(req.params.name + ' director not found.');
    } else {
      res.status(200).json(movies);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Get user information
app.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

// Add a user
app.post('/create', [
  check('Username', 'Username is required and must be at least 5 characters').isLength({ min: 5 }),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email must be valid').isEmail(),
  check('Birthday', 'Birthday is required').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const hashedPassword = Users.hashPassword(req.body.Password);
    const existingUser = await Users.findOne({ Username: req.body.Username });

    if (existingUser) {
      return res.status(400).send(req.body.Username + ' user already exists.');
    }

    const newUser = await Users.create({
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Update user information
app.put('/update', [
  check('Username', 'Username is required and must be at least 5 characters').isLength({ min: 5 }),
  check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email must be valid').isEmail()
], passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (req.user.Username !== req.body.Username) {
      return res.status(400).send('Permission denied');
    }

    const hashedPassword = Users.hashPassword(req.body.Password);
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.body.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
        }
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Delete a user
app.delete('/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const deletedUser = await Users.findOneAndDelete({ Username: req.body.Username });
    if (!deletedUser) {
      return res.status(404).send(req.body.Username + ' user not found.');
    }
    res.status(200).send(req.body.Username + ' user was removed from records.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Check if a movie is in user's favorites
app.post('/favorites/check', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { Username, Favorite } = req.body;
    const user = await Users.findOne({ Username }).populate('favorites');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isFavorite = user.favorites.some(movie => movie.Title === Favorite);
    res.json({ isFavorite });
  } catch (error) {
    console.error('Error checking favorite status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a movie to user's favorites
app.post('/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.body.Username },
      { $addToSet: { Favorite: req.body.Favorite } },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Delete a movie from user's favorites
app.delete('/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.body.Username },
      { $pull: { Favorite: req.body.Favorite } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error.message);
  }
});

// Search movies externally
app.get('/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const baseURL = 'https://movies-flex-6e317721b427.herokuapp.com';
  const fullURL = `${baseURL}?search=${query}`;

  // Redirect to the constructed URL
  res.redirect(fullURL);
});

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Request time middleware
app.use(function (req, res, next) {
  req.requestTime = Date.now();
  next();
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
