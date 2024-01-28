const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect( process.env.URL_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true })
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
let cors = require('cors');
let allowedOrigins = [ 'https://movies-flex-6e317721b427.herokuapp.com'];
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
app.get('/', async (req, res) => {
  res.status(200).send("Welcome to myFlix Movie Database"),
  req.responseText += '<small>Requested at: ' + 
  req.requestTime + '</small>';
});

//WELCOME MESSAGE 
app.get('/api/about', async (req, res) => {
  res.status(200).sendFile('./public/doc.html', { root: __dirname });
  req.responseText += '<small>Requested at: ' + 
  req.requestTime + '</small>';
});

//MOVIES LIST 
app.get('/api/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//TITLE SEARCH 
app.get('/api/movies/title/:label', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await Movies.find({ Title: req.params.label })
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
app.get('/api/movies/release/:year', async (req, res) => {
  await Movies.find({ Release: req.params.year})
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
app.get('/api/movies/rated/:audience', async (req, res) => {
  await Movies.find({ Rated: req.params.audience })
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
app.get('/api/movies/rating/:percentage', async (req, res) => {
  await Movies.find({ Rating: req.params.percentage })
  .then((percentage) => {
    if (!percentage) {
      res.status(400).send(req.params.percentage + ' rotten tomatoes percentage is either a rating that is yet to match a film in our database or invalid percentage ourside the range of (0-100)');
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
app.get('/api/movies/genre/:genreName', async (req, res) => {
  await Movies.find({'Genre.Name': req.params.genreName})
  .then((movies) => {
    if (movies.length == 0) {
      res.status(400).send(req.params.genreName + ' category not in our database sorry we consider more additions in the future.');
    } else {
      res.status(200).json(movies)
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});


///DIRECTOR SEARCH WORKS
app.get("/api/movies/director/:name", async (req, res) => {
  Movies.find({'Director.Name': req.params.name })
  .then((movies) => {
    if (movies.length == 0) {
      res.status(400).send(req.params.name + ' is a director not yet added to database please try someone else.');
    } else {
      res.status(200).json(movies)
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//Add a user - WORKS error works
app.post('/api/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required at least 5 letters').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' user is already in our records please try another user');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday,
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
app.put('api/users/:identity', passport.authenticate ('jwt',
{session: false}), 
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], passport.authenticate('jwt', {session: false}), async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
      // CONDITION TO CHECK ADDED HERE
      if(req.user._id !== req.body._id){
        return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS
    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findByIdAndUpdate({ _id: req.body.identity }, { $set:
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
    if (!updatedUser) {
      res.status(400).send(req.param._id + ' user has nothing to update.');
    } else {
      res.status(200).send(req.param._id + ' user information has been updated.');
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// Delete a user by username
app.delete('/api/user/:identity/film_id', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await Users.findByIdAndDelete({_id: req.params.identity})
    .then((identity) => {
      if (identity.length == 0) {
        res.status(400).send(req.params._id + ' user was not in our records. ');
      } else {
        res.status(200).send(req.params._id + ' user was removed from our records.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Add a movie to a user's list of favorites
app.post('/api/user/:identity/:film_id', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await Users.findByIdAndUpdate({ _id: req.params.identity }, {
     $addToSet: { Favorite: req.params.film_id}
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((film_id) => {
    if (film_id.length > 1) {
      res.status(400).send(req.params.film_id + ' film id already added to account.');
    } else {
      res.status(200).send(req.params.film_id + ' film id being added to favorites.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Delete a movie to a user's list of favorites
app.delete('/api/user/:identity/Favorite/:film_id', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await Users.findByIdAndDelete({_id: req.params.identity}, {
     $deleteToSet: {Favorite: req.params.film_id}
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((film_id) => {
    if (film_id.length == 0) {
      res.status(400).send(req.params.film_id + ' favorite film id either mistype or already deleted.');
    } else {
      res.status(200).send(req.params.film_id + ' favorite film id deleted.');
    }
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