const express = require('express'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');
morgan = require('morgan');
uuid = require('uuid');
fs = require('fs');
path = require('path');
const app = express();
app.use(morgan('common'));



app.use(bodyParser.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({
  extended: true
}));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags:'a'})
app.use(morgan('combined', {stream:accessLogStream}));


let users = [
  {  
    id: 1,
    name: "Bob",
    favoriteMovie: []
  },
  {
    id: 2,
    name: "Matt" ,  
    favoriteMovie: ["Castle in the Sky"]
  },
]

let movies = [
  {
    Title: "All Quiet on the Western Front",
    description: "The story follows teenagers Paul Bäumer and his friends Albert and Müller, who voluntarily enlist in the German army, riding a wave of patriotic fervor that quickly dissipates once they face the brutal realities of life on the front. Paul's preconceptions about the enemy and the rights and wrongs of the conflict soon crumble. However, amid the countdown to armistice, Paul must carry on fighting until the end, with no purpose other than to satisfy the top brass' desire to end the war on a German offensive.",
    rating: "90",
    genre: {
      name: "War",
    },
    director: {
      name:"Edward Berger",
      bio: "Edward Berger was born in 1970 in Wolfsburg, Lower Saxony, Germany. He is a director and writer, known for All Quiet on the Western Front (2022), Jack (2014) and Deutschland 83 (2015). He is married to Nele Mueller-Stöfen.",
      birth: "1970",
    },
    imageURL:"express/pictures/All Quiet on Western Front.jpg",
  },
  {
    Title: "Barbie",
    description: "Barbie suffers a crisis that leads her to question her world and her existence.",
    rating: "80",
    genre: {
      name: "Comedy",
    },
    director: {
      name:"Greta Gerwig",
      bio: "Greta Gerwig, in full Greta Celeste Gerwig, (born August 4, 1983, Sacramento, California, U.S), American actress, writer, and director who was known for the radiant artlessness of her performances in small independent movies before embarking on a successful career as a filmmaker",
      birth: "1983",
    },
    imageURL:"express/pictures/Barbie.jpg",
  },
  {
    Title: "Castle in the Sky",
    description: "A young boy and a girl with a magic crystal must race against pirates and foreign agents in a search for a legendary floating castle.",
    rating: "96",
    genre: {
      name: "Anime",
    },
    director: {
      name:"Hayao Miyazaki",
      bio: "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
        birth: "1965",
    },
    imageURL:"express/pictures/Castle in the Sky.jpeg",
  },
  {
    Title: "Elemental",
    description: "Disney and Pixar's Elemental, an all-new, original feature film set in Element City, where fire-, water-, land- and air-residents live together. The story introduces Ember, a tough, quick-witted and fiery young woman, whose friendship with a fun, sappy, go-with-the-flow guy named Wade challenges her beliefs about the world they live in.",
    rating: "74",
    genre: {
      name: "Family",
    },
    director: {
      name:"Peter Sohn",
      bio: "Peter Sohn (born October 18, 1977) is an American animator, filmmaker, and voice actor, best known for his work at Pixar Animation Studios. He directed the short film Partly Cloudy (2009) and the feature films The Good Dinosaur (2015) and Elemental (2023). He has also been the voice of Emile in Ratatouille (2007), Squishy in Monsters University (2013), and Sox in Lightyear (2022)",
      birth: "1977"
    },
    imageURL:"express/pictures/Elemental.jpg",
  },
  {
    Title: "Guardian of the Galaxy Vol.3",
    description: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe",
    rating: "82",
    genre: {
      name: "Sci-Fi",
    },
    director: {
      name:"James Gunn",
      bio: "James Francis Gunn Jr. (born August 5, 1966)[n 1] is an American filmmaker and studio executive. He began his career as a screenwriter in the mid-1990s, starting at Troma Entertainment with Tromeo and Juliet (1997). He then began working as a director, starting with the horror-comedy film Slither (2006), and moving to the superhero genre with Super (2010), Guardians of the Galaxy (2014), Guardians of the Galaxy Vol. 2 (2017), The Suicide Squad (2021), and Guardians of the Galaxy Vol. 3 (2023). In 2022, Warner Bros. Discovery hired Gunn and Peter Safran to become co-chairmen and co-CEOs of DC Studios.",
      birth: "1966",
    },
    imageURL:"express/pictures/Guardian of the Galaxy Vol.3.png",
  },
  {
    Title: "Insidious Last Key",
    description: "Parapsychologist Dr. Elise Rainier faces her most fearsome and personal haunting yet, as she is drawn back to her ghostly childhood home where the terror began.",
    rating: "33",
    genre: {
      name: "Horror",
    },
    director: {
      name:"Adam Robitel",
      bio: "Adam Robitel (born May 26, 1978) is an American film director, producer, screenwriter, and actor. He is best known for directing horror films, such as The Taking of Deborah Logan (2014), Insidious: The Last Key (2018), Escape Room (2019) and its sequel Escape Room: Tournament of Champions (2021). He also co-wrote Paranormal Activity: The Ghost Dimension (2015).",
      birth: "1978",
    },
    imageURL:"express/pictures/Insidious Last Key.jpeg",
  },
  {
    Title: "John Wick - Chapter 4",
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    rating: "94",
    genre: {
      name: "Action",
    },
    director: {
      name:" Chad Stahelski",
      bio: "Chad Stahelski is an American stuntman, actor, and film director123. He was born on September 20, 1968 in the United States13. He is best known for directing the John Wick film series12. He has also worked as a stuntman, stunt coordinator, and second unit director on several films1.",
      birth: "1968",
    },
    imageURL:"express/pictures/John Wick - Chapter 4.jpg",
  },
  {
    Title: "Raiders of the Lost Ark",
    description: "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before the Nazis can obtain its awesome powers",
    rating: "93",
    genre: {
      name: "Adventure",
    },
    director: {
      name: "Steven Spielburg",
      bio: "Steven Spielburg is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history.[1] He is the recipient of many accolades, including three Academy Awards, two BAFTA Awards, and four Directors Guild of America Awards, as well as the AFI Life Achievement Award in 1995, the Kennedy Center Honor in 2006, the Cecil B. DeMille Award in 2009 and the Presidential Medal of Freedom in 2015. Seven of his films have been inducted into the National Film Registry by the Library of Congress as culturally, historically or aesthetically significant"
,
      birth: "1946",
    },
    imageURL:"express/pictures/Raiders of the Lost Ark.jpeg",
  },
   {
    Title: "Rebel Moon: Part One – A Child of Fire",
    description: "When a peaceful colony on the edge of a galaxy finds itself threatened by the armies of a tyrannical ruling force, Kora (Sofia Boutella), a mysterious stranger living among the villagers, becomes their best hope for survival. Tasked with finding trained fighters who will unite with her in making an impossible stand against the Mother World, Kora assembles a small band of warriors -- outsiders, insurgents, peasants and orphans of war from different worlds who share a common need for redemption and revenge. As the shadow of an entire Realm bears down on the unlikeliest of moons, a battle over the fate of a galaxy is waged, and in the process, a new army of heroes is formed.",
    rating: "100",
    genre: {
      name: "Sci-Fi",
    },
    director: {
      name: "Zack Snyder",
      bio: 
      "Inspired equally by filmmakers like George Lucas and George A. Romero, writer-director Zack Snyder set out to dazzle audiences from day one of his splashy career. Gaining a reputation as a tireless, inventive and efficient director of sleek commercials for companies like BMW and Nike throughout the 1990s, he eventually made the leap to feature films by directing a hyperkinetic reimagining of Romero's zombie classic Dawn of the Dead (2004). Having turned a tidy profit on a modestly budgeted genre picture, Snyder far exceeded studio expectations with his next effort, the highly stylized Spartan epic, 300 (2007), a box-office smash based on the graphic novel by Frank Miller. Nothing if not ambitious, Snyder went on to mount the big-screen adaptation of Watchmen (2009), the ground-breaking comic book miniseries written by Alan Moore. Looking to work on something fraught with less potential for controversy, he helmed the CGI family fantasy Legend of the Guardians: The Owls of Ga'Hoole (2010), then wrote, produced and directed the wildly self-indulgent genre mash-up spectacle Sucker Punch (2011), about a young girl (Emily Browning) who escapes the real world horrors of a mental asylum by retreating into her own fantasies. Resuscitating the Superman franchise with the highly-anticipated Man of Steel (2013) was merely one more make-or-break challenge for the director. Accused of favoring style over substance by his detractors, Snyder unapologetically offered up his films to the fans as pure popcorn entertainment.",
      birth: "1966",
    },
    imageURL:"express/pictures/Rebel-Moon.webp",
  },
  {
    Title: "The Covenant",
    description: "During the war in Afghanistan, a local interpreter risks his own life to carry an injured sergeant across miles of grueling terrain.",
    rating: "84",
    genre: {
      name: "War",
    },
    director: {
      name:"Guy Ritchie",
      bio: "Guy Ritchie is a British film director, writer, producer, and businessman12345. He is known for his trademark crime thrillers and suspense films, such as 'Lock, Stock and Two Smoking Barrels' and 'Snatch'1234. Ritchie left school at age 15 and worked entry-level jobs in the film industry before going on to direct television commercials2. He has also directed the Sherlock Holmes films starring Robert Downey Jr.24. Ritchie is occasionally an actor, pub landlord, and businessman",
      birth: "1968",
    },
    imageURL:"express/pictures/The Covenant.jpeg",
  }
];


app.post('/users', (req,res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('Users need names')
  }
})

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
    user.favoriteMovie.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;
  } else {
    res.status(400).send('no such user')
  }
})

app.delete('/users/:id/:movieTitle', (req,res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id );

  if(user) {
    user.favoriteMovie = user.favoriteMovie.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;
  } else {
    res.status(400).send('no such user')
  }
})

app.delete('/users/:id', (req,res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id );

  if(user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('no such user')
  }
})



  app.get('/', (req, res) => {
    res.send('Welcome to my Cinema database and food database');
    responseText += '<small>Requested at: ' + 
    req.requestTime + '</small>';
    res.send(responseText);
    this.img = document.createElement("img");
    this.img.src = "express/pictures/film-reel.jpg";
    src = getElementById("film-reel");
    src.appendChild(this.img)
  })

  app.get('/movies/', (req, res) => {
    res.json(movies);
  })


  app.get('/movies/:Title', (req, res) => {
      const {Title} = req.params;
      const movie = movies.find( movie => movie.Title === Title);

      if(movie) {
        res.status(200).json(movie);
      } else {
        res.status(400).send('Film title not found in database')
    }
  })

  app.get('/movies/rating/:percentage', (req, res) => {
    const {percentage} = req.params;
    const rating = movies.find(movie => movie.rating === percentage);

    if(rating) {
      res.status(200).json(rating);
    } else {
      res.status(400).send('Sorry there is no film matching that rating')
    }
  })

  app.get('/movies/genre/:genreName', (req, res) => {
    const {genreName} = req.params;
    const genre = movies.find( movie => movie.genre.name === genreName);

    if(genre) {
      res.status(200).json(genre);
    } else {
      res.status(400).send('category not found in database')
    }
  }) 

  app.get('/movies/director/:directorName', (req, res) => {
    const {directorName} = req.params;
    const director = movies.find( movie => movie.director.name === directorName);

    if(directorName) {
      res.status(200).json(directorName);
    } else {
      res.status(400).send('Sorry that film director is not in our database')
    }
  })


  app.get('/movies/about_api/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  })


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
