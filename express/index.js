const express = require("express");
const app = express();


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
    app.get('/', (req, res) => {
    res.send('Welcome to my Cinema database!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
  app.get('/movies', (req, res) => {
    res.json(topmovies);
  });

  app.get('/movies/:title', (req, res) => {
    res.json(obj => obj.title);
  });

    // listen for requests
    app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
