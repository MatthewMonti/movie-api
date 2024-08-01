const mongoose = require('mongoose');
const Models = require('./models.js');
const Movie = Models.Movie;
const User = Models.User;
//mongoose.connect( process.env.URL_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connect( "mongodb+srv://MatthewMonti:1830-France-Paris@cluster0.vz9ijr2.mongodb.net/myFlixDB?retryWrites=true&w=majority&appName=Cluster0"
  , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Mongoose Connected'))
.catch((err) => {console.error(err); });
const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan');
uuid = require('uuid');
fs = require('fs');
path = require('path');
const app = express();
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const cors = require('cors');
let allowedOrigins = [
  'https://movies-flex-6e317721b427.herokuapp.com',
  'http://localhost:1234',
  'https://movies-flex-6e317721b427.herokuapp.com/user/login',
  'https://reel-cinema.netlify.app',
  'https://reel-cinema.netlify.app/user/login'
];
const { check, validationResult } = require('express-validator');

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));
let auth = require('./auth.js')(app);
const passport = require('passport');
const { isArray } = require('lodash');
const { ObjectId } = require('mongodb');
require('./passport.js');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags:'a'})
app.use(morgan('combined', {stream:accessLogStream}));

//WELCOME MESSAGE 
app.get('/', (req, res) => {
  res.send('Welcome to my backend server for reel movie database!');
});

//WELCOME MESSAGE 
app.get('/about', async (req, res) => {
  res.status(200).sendFile('./public/doc.html', { root: __dirname });
  req.responseText += '<small>Requested at: ' + 
  req.requestTime + '</small>';
});

//MOVIES LIST 
app.get('/movies', passport.authenticate('jwt', 
  { session: false }), async (req, res) => {
    await Movie.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

//TITLE SEARCH 
app.get('/movies/title/:label', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await Movie.find({ Title: req.params.label })
  .then((label) => {
    if (label.length == 0) {
      res.status(400).send(req.params.label + ' movie title not in database.');
    } else {
      res.status(200).json(label)
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//RELEASE YEAR 
app.get('/movies/release/:year', async (req, res) => {
  await Movie.find({ Release: req.params.year})
  .then((year) => {
    if (year.length == 0) {
      res.status(400).send(req.params.year + " film year does not have any movies yet or invalid year");
    } else {
      res.status(200).json(year)
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


//RATED FOR FIND APPROPRIATE AUDIENCE WORKS 
app.get('/movies/rated/:audience', async (req, res) => {
  await Movie.find({ Rated: req.params.audience })
  .then((audience) => {
    if (audience.length == 0) {
      res.status(400).send(req.params.audience + ' demographic is either not serviced by database or is invalid entry.');
    } else {
      res.status(200).json(audience)
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Quality of FILMS WORKS
app.get('/movies/rating/:percentage', async (req, res) => {
  await Movie.find({ Rating: req.params.percentage })
  .then((percentage) => {
    if (percentage.length == 0) {
      res.status(400).send(req.params.percentage + ' rotten tomatoes percentage is either a rating that is yet to match a film in our database or invalid percentage outside the range of (0-100)');
    } else {
      res.status(200).json(percentage)
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});
 
//GENRE SEARCH FOR MOVIE
app.get('/movies/genre/:genreName', async (req, res) => {
  await Movie.find({'Genre.Name': req.params.genreName})
  .then((movie) => {
    if (movie.length == 0) {
      res.status(400).send(req.params.genreName + ' category not in our database sorry we consider more additions in the future.');
    } else {
      res.status(200).json(movie)
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});


///DIRECTOR SEARCH WORKS
app.get("/movies/director/:name", async (req, res) => {
  Movie.find({'Director.Name': req.params.name })
  .then((movie) => {
    if (movie.length == 0) {
      res.status(400).send(req.params.name + ' is a director not yet added to database please try someone else.');
    } else {
      res.status(200).json(movie)
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});


//Get user information
app.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Get user information from the request object
  res.json(req.user);
});
//Add a user - WORKS error works
app.post('/create',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required at least 5 letters').isLength({min: 5}),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
    check('Birthday', 'Birthday is required').not().isEmpty()
  ], async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = User.hashPassword(req.body.Password);
    await User.findOne({_id: (req.body._id)}) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' user is already in our records please try another user');
        } else {
          User
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { 
              res.status(201).json(user)
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

  /// USER CAN UPDATE FOLLOWING - WORKS
// USER NAME
//EMAIL
//BIRTHDAY 
app.put('/update', 
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
 passport.authenticate('jwt', {session: false}), async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = User.hashPassword(req.body.Password);
    await User.findOneAndUpdate({_id: (req.body._id)}, { $set:
    {
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});


// Delete a user by username - WORKS
app.delete('/delete', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await User.findOneAndDelete({_id: (req.body._id)})
    .then((_id) => {
        res.status(200).send(req.body._id+ ' user was removed from our records.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



app.post('/favorites/check', passport.authenticate('jwt', { session: false }), async (req, res) => {
try {
    const { _id, Favorite } = req.body;

    // Find the user by Username and populate favorites
    const user = await User.findOne({_id: (req.body._id)}).populate('favorites');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the movie is in the user's favorites
    const isFavorite = user.favorites.some(movie => movie.Title === Favorite);

    res.json({ isFavorite });
  } catch (error) {
    console.error('Error checking favorite status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Add a movie to the user's list of favorites
app.post('/favorites', async (req, res) => {
  try {
    const userId = req.user._id; // Get the logged-in user's ID from req.user
    const favoriteMovieId = req.body.MovieID; // Assuming the request body contains MovieID

    // Check if the movie exists
    const movie = await Movie.findById(favoriteMovieId);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    // Add the movie to the user's list of favorites if not already added
    await User.findByIdAndUpdate(
      userId,
      { $slice: { FavoriteMovies: favoriteMovieId } }, // $addToSet ensures no duplicates
      { new: true }
    )
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err.message);
  }
});
  


// Delete a movie to a user's list of favorites
app.delete('/favorites', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await User.findOneAndUpdate({ _id: ObjectId}, {
     $pull: { Favorite: req.body.Favorite }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.status(200).json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


  let logwebpage = (req, res, next) => {
    console.log(req.url);
    next();
  };

  let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
  };

  app.use(logwebpage);
  app.use(requestTime);


   // listen for requests
   const port = process.env.PORT || 8080;
   app.listen(port, '0.0.0.0',() => {
    console.log('Listening on Port ' + port);
   });