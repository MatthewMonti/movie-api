const express = require('express');
morgan = require('morgan');
uuid = require('uuid');
fs = require('fs');
path = require('path');
const app = express();
app.use(morgan('common'));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags:'a'})
app.use(morgan('combined', {stream:accessLogStream}));

let movies = [
  {
    id: 1,
    title: "All Quiet on the Western Front",
    director:'Edward Berger',
    rating: '90%',
    genreName: 'History'
  },
  {
    id: 2,
    title: "Castle in the Sky",
    director: 'Hayao Miyazaki',
    rating: '96%',
    genreName: 'Anime'
  },
  {
    id: 3,
    title: "Guardian of the Galaxy Vol. 3",
    director: 'James Gunn',
    rating: '82%',
    genreName:'Sci-Fi'
  },
  {
    id: 4,
    title: "Guy Ritchie's The Covenant",
    director: 'Guy Ritchie',
    rating:'84%',
    genreName: 'War'
  },
  {
    id: 5,
    title: "Insidious: The Last Key",
    director: 'Adam Robitel',
    rating: '33%',
    genreName: 'Horror'
  },
  {
    id: 6,
    title:  "John Wick Chapter: 4",
    director: 'Chad Stahelski',
    rating: '94%',
    genreName: 'Action'
  },
  {
    id: 7,
    title: "Missing",
    director: 'Will Merrick, Nicholas D. Johnson',
    rating: '87%',
    genreName: 'mystery'
  },
  {
    id: 8,
    title: "Raiders of the Lost Ark",
    director: 'Steven Spielburg',
    rating: '93%',
    genreName: 'adventure'
  },
  {
    id: 9,
    title: "The Super Mario Bros. Movie",
    director: 'Aaron Horvath, Michael Jelenic',
    rating:'58%',
    genreName: 'Family'
  },
  {
    id: 10,
    title: "To End All War: Oppenheimer & The Atomic Bomb",
    director: 'Christopher Cassel',
    rating:  '95%',
    genreName: 'Biography'
  }
];
  
// GET requests

  app.get('/', (req, res) => {
    res.send('Welcome to my Cinema database!');
    responseText += '<small>Requested at: ' + 
    req.requestTime + '</small>';
    res.send(responseText);
  });

  app.get('/movies', (req, res) => {
    res.json(movies);
  });

  app.get('/movies/documentation.html', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });

  app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) =>
      { return movie.title === req.params.title }));
  });

  app.get('/movies/rating', (req, res) => {
    res.json(movies.find((movie) =>
      { return movie.rating === req.params.rating }));
  });

  app.get('/movies/genreName', (req, res) => {
    res.json(movies.genreName.find((movie) =>
      { return movie.genreName === req.params.genreName }));
  });

  app.get('/movies/name', (req, res) => {
    res.json(movies.find((movie) =>
      { return movie.name === req.params.name }));
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
  

  const bodyParser = require('body-parser'),
  methodOverride = require('method-override');
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broke!')
  });
    
   // listen for requests
    app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
