const express = require('express');
const app = express();

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

morgan = require('morgan');
app.use(morgan('common'));
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});
app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});


let title = [
  {
    title: "Raiders of the Lost Ark"
  },
  {
    title: "The SUPER MARIO BROS. MOVIE"
  },
  {
    title: "ALL QUIET ON THE WESTERN FRONT"
  },
  {
    title: "Castle in the Sky"
  },
  {
    title: "TO END ALL WAR: OPPENHEIMER & THE ATOMIC BOMB"
  },
  {
    title: "GUARDIANS OF THE GALAXY VOL. 3"
  },
  {
    title: "John Wick Chapter: 4"
  },
  {
    title: "GUY RITCHIE'S THE COVENANT"
  },
  {
    title: "Missing"
  },
  {
    title: "INSIDIOUS: THE LAST KEY"
  }

];

// GET requests
app.get('/', (req, res) => {
  res.send('Title of the films');
});
app.get('/movies', (req, res) => {                  
  res.sendFile('public/title.html', { root: __dirname });
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
  },
  {
    rating: '96%'
  },
  {
    rating: '95%'
  },
  {
    rating: '82%'
  },
  {
    rating: '94%'
  },
  {
    rating: '84%'
  },
  {
    rating: '87%'
  },
  {
    rating: '33%'
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

let genreName = [
  {
    genreName: 'adventure',
  },
  {
    genreName: 'Family'
  },
  {
    genreName: 'History'
  },
  {
    genreName: 'Anime'
  },
  {
    genreName: 'Biography'
  },
  {
    genreName: 'Sci-Fi'
  },
  {
    genreName: 'Action'
  },
  {
    genreName: 'War'
  },
  {
    genreName: 'mystery'
  },
  {
    genreName: 'Horror'
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
  },
  {
    director: 'Hayao Miyazaki'
  },
  {
    director: 'Christopher Cassel'
  },
  {
    director: 'James Gunn'
  },
  {
    director: 'Chad Stahelski'
  },
  {
    director: 'Guy Ritchie'
  },
  {
    director: 'Will Merrick, Nicholas D. Johnson'
  },
  {
    director: 'Adam Robitel'
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
