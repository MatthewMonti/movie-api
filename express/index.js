const express = require("express");
morgan = require('morgan');
uuid = require('uuid');
fs = require('fs');
path = require('path');
const app = express();
app.use(morgan('common'));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags:'a'})
app.use(morgan('combined', {stream:accessLogStream}));

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



// Adds data for a new student to our list of students.
app.post('/students', (req, res) => {
  let newStudent = req.body;

  if (!newStudent.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newStudent.id = uuid.v4();
    students.push(newStudent);
    res.status(201).send(newStudent);
  }
});

// Deletes a student from our list by ID
app.delete('/students/:id', (req, res) => {
  let student = students.find((student) => { return student.id === req.params.id });

  if (student) {
    students = students.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('Student ' + req.params.id + ' was deleted.');
  }
});

// Update the "grade" of a student by student name/class name
app.put('/students/:name/:class/:grade', (req, res) => {
  let student = students.find((student) => { return student.name === req.params.name });

  if (student) {
    student.classes[req.params.class] = parseInt(req.params.grade);
    res.status(201).send('Student ' + req.params.name + ' was assigned a grade of ' + req.params.grade + ' in ' + req.params.class);
  } else {
    res.status(404).send('Student with the name ' + req.params.name + ' was not found.');
  }
});

// Gets the GPA of a student
app.get('/students/:name/gpa', (req, res) => {
  let student = students.find((student) => { return student.name === req.params.name });

  if (student) {
    let classesGrades = Object.values(student.classes); // Object.values() filters out object's keys and keeps the values that are returned as a new array
    let sumOfGrades = 0;
    classesGrades.forEach(grade => {
      sumOfGrades = sumOfGrades + grade;
    });

    let gpa = sumOfGrades / classesGrades.length;
    console.log(sumOfGrades);
    console.log(classesGrades.length);
    console.log(gpa);
    res.status(201).send('' + gpa);
    //res.status(201).send(gpa);
  } else {
    res.status(404).send('Student with the name ' + req.params.name + ' was not found.');
  }
});









  
// GET requests
    app.get('/movies', (req, res) => {
    res.json(topmovies);
  });

// Gets the data about a single student, by name



    app.get('/movies/:title', (req, res) => {
      res.json(movies.find((MOVIE) =>
        { return MOVIE.title === req.params.title }));
    });


    app.get('/movies/:rating', (req, res) => {
      res.json(movies.find((MOVIE) =>
        { return MOVIE.rating === req.params.rating }));
    });

    app.get('/movies/genres/:genreName', (req, res) => {
      res.json(movies.genres.find((MOVIE) =>
        { return MOVIE.genres === req.params.genreName }));
    });


    app.get('/movies/directors/:name', (req, res) => {
      res.json(movies.find((MOVIE) =>
        { return movies.director === req.params.name }));
    });


    app.get('/students/:name', (req, res) => {
      res.json(students.find((student) =>
        { return student.name === req.params.name }));
    });

    app.get('/students/:name', (req, res) => {
      res.json(students.find((student) =>
        { return student.name === req.params.name }));
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
