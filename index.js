const express = require('express');
const app = express();

let topBooks = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling'
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien'
  },
  {
    title: 'Twilight',
    author: 'Stephanie Meyer'
  }
];
// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});
app.get('/books', (req, res) => {
  res.json(topBooks);
});
// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};
app.use(myLogger);
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});
app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});


morgan = require('morgan');
app.use(morgan('common'));
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});
app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});


let movies = [
  {
    movies: 'Raiders of the Lost Ark',
  },
  {
    movies: 'THE SUPER MARIO BROS. MOVIE'
  },
  {
    movies: 'ALL QUIET ON THE WESTERN FRONT'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('List of all the films');
});
app.get('/movies', (req, res) => {                  
  res.sendFile('public/movies.html', { root: __dirname });
});
app.get('/movies', (req, res) => {
  res.json(movies);
});

let rating = [
  {
    rating: '93%',
  },
  {
    rating: '58%',
  },
  {
    rating: '90%',
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Film Rating from Rotton Tomatoes');
});
app.get('/movies/:rating', (req, res) => {                  
  res.sendFile('public/rating.html', { root: __dirname });
});
app.get('/rating', (req, res) => {
  res.json(rating);
});

let title = [
  {
    title: 'Raiders of the Lost Ark',
  },
  {
    title: 'THE SUPER MARIO BROS. MOVIE'
  },
  {
    title: 'ALL QUIET ON THE WESTERN FRONT'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Title of Films');
});
app.get('/movies/:title', (req, res) => {                  
  res.sendFile('public/title.html', { root: __dirname });
});
app.get('/title', (req, res) => {
  res.json(rating);
});

let genreName = [
  {
    genreName: 'adventure',
  },
  {
    genreName: 'Family'
  },
  {
    genreName: 'History'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Genre of the films');
});
app.get('/movies/:rating', (req, res) => {                  
  res.sendFile('public/rating.html', { root: __dirname });
});
app.get('/rating', (req, res) => {
  res.json(rating);
});

let director = [
  {
    director: 'Steven Spielburg',
  },
  {
    director: 'Aaron Horvath, Michael Jelenic'
  },
  {
    director: 'Edward Berger'
  }
];
  
// GET requests
app.get('/', (req, res) => {
  res.send('Director of the films');
});
app.get('/movies/:director', (req, res) => {                  
  res.sendFile('public/director.html', { root: __dirname });
});
app.get('/director', (req, res) => {
  res.json(director);
});
