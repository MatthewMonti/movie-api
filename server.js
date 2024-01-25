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
let allowedOrigins = ['http://localhost:8080', 'https://movies-flex-6e317721b427.herokuapp.com'];
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


//API DOCUMENTATION WORKS
// access documentation.html using express.static
app.use("/documentation", express.static("public"));

//MOVIES LIST WORKS
app.get('/api/movies', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
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
app.get('/api/movies/Title/:title', passport.authenticate ('jwt',
{session: false}), async (req, res) => {
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
app.get('/api/movies/Release/:releaseyear', passport.authenticate ('jwt',
{session: false}), async (req, res) => {
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
app.get('/api/movies/Rated/:rated', passport.authenticate ('jwt',
{session: false}), async (req, res) => {
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
app.get('/api/movies/Rating/:rating', passport.authenticate ('jwt',
{session: false}), async (req, res) => {
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
app.get('/api/movies/Genre/:genreName', passport.authenticate ('jwt',
{session: false}), async (req, res) => {
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
app.get("/api/movies/Director/:name", passport.authenticate ('jwt', 
{session: false}), async (req, res) => {
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

// Get a user by username WORKS - ERORR WORKS
app.get('api/users/:Username', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await Users.find({ Username: req.params.Username })
    .then((user) => {
      if (user.length == 0) {
        res.status(400).send(req.params.Username + ' not database');
      } else {
        res.status(200).json(user)
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Add a user - WORKS error works
app.post('api/users',
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
    await Users.findOne({ _id: req.body.id }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.id + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday,
            })
            .then((user) => { 
              res.status(500).send(req.body.id + ' account been created');
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
app.put('api/users/:id', passport.authenticate ('jwt',
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
  ], async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
      // CONDITION TO CHECK ADDED HERE
      if(req.user._id !== req.params._id){
        return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS
    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOneAndUpdate({ _id: req.params.id }, { $set:
    {
      _id: req.body.id,
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
      res.status(400).send(req.params._id + ' user has nothing to update');
    } else {
      res.status(200).send(req.params._id + ' account has been updated.');
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// Add a movie to a user's list of favorites
app.post('/api/users/:Username/movies/:id', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { Favorite: req.params._id }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    if (updatedUser.length == 0) {
      res.status(400).send(req.params.Username + ' not in database');
    } else {
      res.status(200).json(releaseyear)
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


// DELETE movie to a user's list of favorites
app.delete('/api/users/:Username/movies/:id', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ _id: req.params.id }, {
     $pull: { Favorite: req.params.Favorite }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    if (updatedUser.length == 0) {
      res.status(400).send(req.params.Favorite + ' not in database');
    } else {
      res.status(200).json(releaseyear)
    }
  })
    .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
   


// Delete a user by username - WORKS
//Mongoose Verion 5 2.8 of CareerFoundry is DATED
// https://www.appsloveworld.com/mongodb/100/185/mongodb-findoneanddelete-is-not-a-function-error
//findOneAndRemove NOT VALID FUNCTION
//FindOneAndDelete VALID FUNCTION
//6x Mongoose -> 10.2.5 (current version code made)
app.delete('/api/users/:id', passport.authenticate ('jwt',
{session: false}), async (req, res) => {
  await Users.findOneAndDelete({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.id + ' was not found');
      } else {
        res.status(200).send(req.params.id + ' was deleted.');
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