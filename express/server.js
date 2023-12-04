const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlixDB')
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
app.use(bodyParser.urlencoded({ extended: true }));
let auth = require('./auth.js')(app);
const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
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
const passport = require('passport');
require('./passport.js');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags:'a'})
app.use(morgan('combined', {stream:accessLogStream}));
const {check,validationResult} = require('express-validator');


app.get('/', passport.authenticate('jwt', 
{session: false}), async (req, res) => {
  res.send('Welcome to my Cinema database');
  req.responseText += '<small>Requested at: ' + 
  req.requestTime + '</small>';
});



//MOVIES LIST WORKS
app.get('/movies', passport.authenticate('jwt', { session: false }), 
async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


//TITLE SEARCH WORKS
app.get('/movies/title/:title', passport.authenticate('jwt', 
{ session: false}), async (req, res) => {
  await Movies.findOne({ Title: req.params.title })
  .then((title) => {
    res.status(201).json(title);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//RELEASE YEAR WORkS
app.get('/movies/releaseyear/:releaseyear', passport.authenticate('jwt', 
{session: false}), async (req, res) => {
  await Movies.find({ ReleaseYear: req.params.releaseyear })
  .then((releaseyear) => {
    res.status(201).json(releaseyear);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//RATED FOR FIND APPROPRIATE AUDIENCE WORKS 
app.get('/movies/rated/:rated', passport.authenticate ('jwt',
{session: false}), async (req, res) => {
  await Movies.find({ Rated: req.params.rated })
  .then((rated) => {
    res.status(201).json(rated);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//Quality of FILMS WORKS
app.get('/movies/rating/:rating', passport.authenticate ('jwt', 
{session: false}), async (req, res) => {
  await Movies.find({ Rating: req.params.rating })
  .then((rating) => {
    res.status(201).json(rating);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});
 
//GENRE SEARCH FOR MOVIE
app.get('/movies/genre/:genreName', passport.authenticate ('jwt',
{session: false}), async (req, res) => {
  await Movies.find({'Genre.Name': req.params.genreName})
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});


///DIRECTOR SEARCH WORKS
app.get("/movies/director/:name", passport.authenticate ('jwt', 
{session: false}), async (req, res) => {
  Movies.find({'Director.Name': req.params.name })
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});


//API DOCUMENTATION WORKS
app.get('/movies/about_api/documentation', passport.authenticate ('jwt',
  {session: false}), async  (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
})


// USERS ARE DISPLAYED WORKS
app.get('/users', passport.authenticate ('jwt', 
  {session: false}), async (req, res) => {
  Users.find().then(users => res.status(201).json(users));
});

// Get a user by username WORKS
app.get('/users/:Username', passport.authenticate ('jwt', 
  {session: false}), async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


//Add a user - WQRKS
app.post('/users', async (req, res) => {
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
    check('Featured', 'Feature in Movie Theater statement true or false not NULL').isBoolean(),
], async(req, res) => {
//check the validation object for errors
  let errors = validationResult(req);
}
if (!error.isEmpty()) {
  return res.status(422).json({errors: errors.array});
}

let hashedPassword = Users.hashPassword(req.body.Password);
  
  await Users.findOne({ Username: req.body.Username }) //Search to see if a user with the requested username alreadyy exists
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
            Favorite: req.body.Favorite
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
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
//FAVORITE MOVIE
app.put('/users/:Username',  passport.authenticate('jwt', { session: false }), async (req, res) => {
    // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
    check('Featured', 'Feature in Movie Theater statement true or false not NULL').isBoolean(),
], async(req, res) => {
//check the validation object for errors
  let errors = validationResult(req);
}
if (!error.isEmpty()) {
  return res.status(422).json({errors: errors.array});
}

let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
      Favorite: req.body.Favorite
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.status(201).json(updatedUser);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});





// Delete a user by username
// had to change findOneAndRemove to find worked in put NOT in delete 
// tutor advice NOTED
app.delete('/users/:Username', async (req, res) => {
  await Users.find({ Username: req.params.Username })
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

//PORT NO LONGER DEFAULT 8080 FOR PEOPLE 
//USING APP CHANGE WHEN NEEDED
  const port = process.env.PORT || 8080;
  app.listen(port, '0.0.0.0',() => {
   console.log('Listening on Port ' + port);
  });
  
