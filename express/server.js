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

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags:'a'})
app.use(morgan('combined', {stream:accessLogStream}));


app.get('/', (req, res) => {
  res.send('Welcome to my Cinema database');
  req.responseText += '<small>Requested at: ' + 
  req.requestTime + '</small>';
})

app.get('/movies/', async (req, res) => {
  await Movies.find()
  .then((movies) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


app.get('/movies/title/:title', async (req, res) => {
  console.log(req.params.title, "49");
  await Movies.findOne({ Title: req.params.title })
  .then((title) => {
    res.json(title);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


app.get('/movies/releaseyear/:releaseyear', async (req, res) => {
  await Movies.find({ ReleaseYear: req.params.releaseyear })
  .then((releaseyear) => {
    res.json(releaseyear);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//RATED FOR FIND APPROPRIATE AUDIENCE WORKS 
app.get('/movies/rated/:rated', async (req, res) => {
  await Movies.find({ Rated: req.params.rated })
  .then((rated) => {
    res.json(rated);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//AGE CORRECT FILMS WORKS
app.get('/movies/rating/:rating', async (req, res) => {
  await Movies.find({ Rating: req.params.rating })
  .then((rating) => {
    res.json(rating);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
 

/// Type of films user wants - ERR UNDEFINED & EMPTY ARRAY
app.get("/genre/:genre", (req, res) => {
  Movies.findOne({Genre: req.params.genre })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


///RANDOM MOVIE NOT CONNECTED TO DIRECTOR NAME
app.get("/director/:director", (req, res) => {
  Movies.findOne({Director: req.params.director })
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});




app.get('/movies/about_api/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
})


// USERS ARE DISPLAYED 
app.get('/users', async (req, res) => {
  Users.find().then(users => res.json(users));
});

// Get a user by username WORKS
app.get('/users/:UserName', async (req, res) => {
  await Users.findOne({ UserName: req.params.UserName })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// ADD USER  
app.post('/create-users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username
  })
      .then ((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password, 
              Email: req.body.Email,
              Birthday: req.body.Birthday,
              FavoriteMovies: req.body.FavoriteMovies
            })
            .then((user) => {res.status(201).json(user)
            })  
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


app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
      FavoriteMovies: req.body.FavoriteMovies
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  })
});



app.put('/users/:id',(req,res) => {
  const {id} = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if(user) {
    user.name = updatedUser.name;
    res.status(200).json(user)
  } else {
    res.status(400).send('no such user')
  }
})

app.post('/users/:id/:movieTitle', (req,res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id );

  if(user) {
    user.FavoriteMovie.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;
  } else {
    res.status(400).send('no such user')
  }
})

app.delete('/users/:id/:movieTitle', (req,res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id );

  if(user) {
    user.FavoriteMovie = user.FavoriteMovie.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;
  } else {
    res.status(400).send('no such user')
  }
})

// Delete a user by username - NOT WORKING
app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
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
    app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });

