const express = require("express");
morgan = require('morgan');
fs require('fs');
path require('path');
const app = express();

app.use(morgan('common'));

const accessLogStream = fs.createWriteStream(path.join(_dirname, 'log.txt'), {flags: 'a'}) 
app.use(morgan('combined', {stream: accessLogStream}));


let topmovies = [
  {
    title: "Raiders of the Lost Ark",
    director: 'Steven Spielburg',
    rating: '93%',
    genreName: 'adventure'
  },
  {
    title: "The SUPER MARIO BROS. MOVIE",
    director: 'Aaron Horvath, Michael Jelenic',
    rating:'58%',
    genreName: 'Family'
  },
  {
    title: "ALL QUIET ON THE WESTERN FRONT",
    director:'Edward Berger',
    rating: '90%',
    genreName: 'History'
  },
  {
    title: "Castle in the Sky",
    director: 'Hayao Miyazaki',
    rating: '96%',
    genreName: 'Anime'
  },
  {
    title:  "TO END ALL WAR: OPPENHEIMER & THE ATOMIC BOMB",
    director: 'Christopher Cassel',
    rating:  '95%',
    genreName: 'Biography'
  },
  {
    title: "GUARDIANS OF THE GALAXY VOL. 3",
    director: 'James Gunn',
    rating: '82%',
    genreName:'Sci-Fi'
  },
  {
    title:  "John Wick Chapter: 4",
    director: 'Chad Stahelski',
    rating: '94%',
    genreName: 'Action'
  },
  {
    title: "GUY RITCHIE'S THE COVENANT",
    director: 'Guy Ritchie',
    rating:'84%',
    genreName: 'War'
  },
  {
    title: "Missing",
    director: 'Will Merrick, Nicholas D. Johnson',
    rating: '87%',
    genreName: 'mystery'
  },
  {
    title: "INSIDIOUS: THE LAST KEY",
    director: 'Adam Robitel',
    rating: '33%',
    genreName: 'Horror'
  }
];
  
// GET requests
    app.get('/movies', (req, res) => {
    res.json(topmovies);
  });

    app.get('/', (req, res) => {
      res.send('Welcome to my Cinema database!');
      responseText += '<small>Requested at: ' + 
      req.requestTime + '</small>';
      res.send(responseText);
  });
  
    app.get('/documentation.html', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
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
    // logic
  });






  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broke!')
  });
    
   // listen for requests
    app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
