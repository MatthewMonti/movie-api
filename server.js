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
let auth = require('./auth')(app);
const passport = require('passport');
const { isArray } = require('lodash');
require('./passport.js');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags:'a'})
app.use(morgan('combined', {stream:accessLogStream}));

//WELCOME MESSAGE WORKS
app.get('/', async (req, res) => {
  res.status(200).send("Welcome to myFlix Movie Database"),
  req.responseText += '<small>Requested at: ' + 
  req.requestTime + '</small>';
});

//WELCOME MESSAGE WORKS
app.get('/api/about_api', async (req, res) => {
  res.status(200).sendFile('./public/doc.html', { root: __dirname });
  req.responseText += '<small>Requested at: ' + 
  req.requestTime + '</small>';
});

//MOVIES LIST WORKS
app.get('/api/movies', async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//TITLE SEARCH WORKS - ERROR WORKS
app.get('/api/movies/Title/:title', async (req, res) => {
  await Movies.find({ Title: req.params.title })
  .then((title) => {
    if (title.length == 0) {
      res.status(400).send(req.params.title + ' not in database');
    } else {
      res.status(200).json(releaseyear)
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//RELEASE YEAR WORkS - ERROR NOT WORKING
app.get('/api/movies/Release/:releaseyear', async (req, res) => {
  await Movies.find({ Release: req.params.releaseyear })
  .then((releaseyear) => {
    if (releaseyear.length == 0) {
      res.status(400).send(req.params.releaseyear + ' not in database');
    } else {
      res.status(200).json(releaseyear)
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


//RATED FOR FIND APPROPRIATE AUDIENCE WORKS 
app.get('/api/movies/Rated/:rated', async (req, res) => {
  await Movies.find({ Rated: req.params.rated })
  .then((rated) => {
    if (rated.length == 0) {
      res.status(400).send(req.params.rated + ' not in database');
    } else {
      res.status(200).json(releaseyear)
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Quality of FILMS WORKS
app.get('/api/movies/Rating/:rating', async (req, res) => {
  await Movies.find({ Rating: req.params.rating })
  .then((rating) => {
    if (rating.length == 0) {
      res.status(400).send(req.params.rating + ' not database');
    } else {
      res.status(200).json(releaseyear)
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});
 
//GENRE SEARCH FOR MOVIE
app.get('/api/movies/Genre/:genreName', async (req, res) => {
  await Movies.find({'Genre.Name': req.params.genreName})
  .then((movies) => {
    if (movies.length == 0) {
      res.status(400).send(req.params.genreName + ' not database');
    } else {
      res.status(200).json(releaseyear)
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});


///DIRECTOR SEARCH WORKS
app.get("/api/movies/Director/:name", async (req, res) => {
  Movies.find({'Director.Name': req.params.name })
  .then((movies) => {
    if (movies.length == 0) {
      res.status(400).send(req.params.name + ' not database');
    } else {
      res.status(200).json(movies)
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});


// USERS ARE DISPLAYED WORKS - ONE USERS LOOKS AT ALL USERS SECURITY ISSUE?
app.get('/api/users', passport.authenticate ('jwt', 
  {session: false}), async (req, res) => {
  Users.find().then(users => res.status(200).json(users));
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
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday,
            })
            .then((user) => { 
              res.status(500).send(req.body.Username + ' account been created');
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
app.put('api/users/:Username', passport.authenticate ('jwt',
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
      if(req.user.Username !== req.body.Username){
        return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS
    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOneAndUpdate({ Username: req.body.Username }, { $set:
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
      res.status(400).send(req.param.Username + ' user has nothing to update');
    } else {
      res.status(200).send(req.param.Username + ' account has been updated.');
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// Add a movie to a user's list of favorites
app.post('/api/Favorite', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.body.Username }, {
     $push: { FavoriteMovies: req.body.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Add a movie to a user's list of favorites
app.delete('/api/Favorite', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.body.Username }, {
     $pull: { FavoriteMovies: req.body.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Delete a user by username
app.delete('/api/users/', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await Users.findOneAndRemove({ Username: req.body.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
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