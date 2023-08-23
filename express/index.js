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
    rating: "90%",
    genre: {
      name: "War",
      description: "The story follows teenagers Paul Bäumer and his friends Albert and Müller, who voluntarily enlist in the German army, riding a wave of patriotic fervor that quickly dissipates once they face the brutal realities of life on the front. Paul's preconceptions about the enemy and the rights and wrongs of the conflict soon crumble. However, amid the countdown to armistice, Paul must carry on fighting until the end, with no purpose other than to satisfy the top brass' desire to end the war on a German offensive."
    },
    director: {
      name:"Edward Berger",
      bio: "Edward Berger was born in 1970 in Wolfsburg, Lower Saxony, Germany. He is a director and writer, known for All Quiet on the Western Front (2022), Jack (2014) and Deutschland 83 (2015). He is married to Nele Mueller-Stöfen.",
      birth: "1970",
    },
    imageURL:"express/pictures/All Quiet on Western Front.jpg",
  },
  {
    id:2,
    title: "Barbie",
    rating: "80%",
    genre: {
    name: "Comedy",
    description: "Barbie suffers a crisis that leads her to question her world and her existence."
    },
    director: {
      name:"Greta Gerwig",
      bio: "Greta Gerwig, in full Greta Celeste Gerwig, (born August 4, 1983, Sacramento, California, U.S), American actress, writer, and director who was known for the radiant artlessness of her performances in small independent movies before embarking on a successful career as a filmmaker",
      birth: "1983",
    },
    imageURL:"express/pictures/Barbie.jpg",
  },
  {
    id: 3,
    title: "Castle in the Sky",
    rating: "96%",
    genre: {
    name: "Anime",
    description: "A young boy and a girl with a magic crystal must race against pirates and foreign agents in a search for a legendary floating castle."
    },
    director: {
      name:"Hayao Miyazaki",
      bio: "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
        birth: "1965",
    },
    imageURL:"express/pictures/Castle in the Sky.jpeg",
  },
  {
    id:4,
    title: "Elemental",
    rating: "74%",
    genre: {
    name: "Family",
    description: "Disney and Pixar's Elemental, an all-new, original feature film set in Element City, where fire-, water-, land- and air-residents live together. The story introduces Ember, a tough, quick-witted and fiery young woman, whose friendship with a fun, sappy, go-with-the-flow guy named Wade challenges her beliefs about the world they live in."
    },
    director: {
      name:"Peter Sohn",
      bio: "Peter Sohn (born October 18, 1977) is an American animator, filmmaker, and voice actor, best known for his work at Pixar Animation Studios. He directed the short film Partly Cloudy (2009) and the feature films The Good Dinosaur (2015) and Elemental (2023). He has also been the voice of Emile in Ratatouille (2007), Squishy in Monsters University (2013), and Sox in Lightyear (2022)",
      birth: "1977"
    },
    imageURL:"express/pictures/Elemental.jpg",
  },
  {
    id:5,
    title: "Guardian of the Galaxy Vol.3",
    rating: "82%",
    genre: {
    name: "Sci-Fi",
    description: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe"
    },
    director: {
      name:"James Gunn",
      bio: "James Francis Gunn Jr. (born August 5, 1966)[n 1] is an American filmmaker and studio executive. He began his career as a screenwriter in the mid-1990s, starting at Troma Entertainment with Tromeo and Juliet (1997). He then began working as a director, starting with the horror-comedy film Slither (2006), and moving to the superhero genre with Super (2010), Guardians of the Galaxy (2014), Guardians of the Galaxy Vol. 2 (2017), The Suicide Squad (2021), and Guardians of the Galaxy Vol. 3 (2023). In 2022, Warner Bros. Discovery hired Gunn and Peter Safran to become co-chairmen and co-CEOs of DC Studios.",
      birth: "1966",
    },
    imageURL:"express/pictures/Guardian of the Galaxy Vol.3.png",
  },
  {
    id:6,
    title: "Insidious Last Key",
    rating: "33%",
    genre: {
    name: "Horror",
    description: "Parapsychologist Dr. Elise Rainier faces her most fearsome and personal haunting yet, as she is drawn back to her ghostly childhood home where the terror began."
    },
    director: {
      name:"Adam Robitel",
      bio: "Adam Robitel (born May 26, 1978) is an American film director, producer, screenwriter, and actor. He is best known for directing horror films, such as The Taking of Deborah Logan (2014), Insidious: The Last Key (2018), Escape Room (2019) and its sequel Escape Room: Tournament of Champions (2021). He also co-wrote Paranormal Activity: The Ghost Dimension (2015).",
      birth: "1978",
    },
    imageURL:"express/pictures/Insidious Last Key.jpeg",
  },
  {
    id:7,
    title: "John Wick - Chapter 4",
    rating: "94%",
    genre: {
    name: "Action",
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes."
    },
    director: {
      name:" Chad Stahelski",
      bio: "Chad Stahelski is an American stuntman, actor, and film director123. He was born on September 20, 1968 in the United States13. He is best known for directing the John Wick film series12. He has also worked as a stuntman, stunt coordinator, and second unit director on several films1.",
      birth: "1968",
    },
    imageURL:"express/pictures/John Wick - Chapter 4.jpg",
  },
  {
    id:8,
    title: "Raiders of the Lost Ark",
    rating: "93%",
    genre: {
    name: "Adventure",
    description: "When a peaceful colony on the edge of a galaxy finds itself threatened by the armies of a tyrannical ruling force, Kora (Sofia Boutella), a mysterious stranger living among the villagers, becomes their best hope for survival. Tasked with finding trained fighters who will unite with her in making an impossible stand against the Mother World, Kora assembles a small band of warriors -- outsiders, insurgents, peasants and orphans of war from different worlds who share a common need for redemption and revenge. As the shadow of an entire Realm bears down on the unlikeliest of moons, a battle over the fate of a galaxy is waged, and in the process, a new army of heroes is formed."
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
    id:9,
    title: "Rebel Moon: Part One – A Child of Fire",
    rating: "100%",
    genre: {
    name: "Sci-Fi",
    description: "When a peaceful colony on the edge of a galaxy finds itself threatened by the armies of a tyrannical ruling force, Kora (Sofia Boutella), a mysterious stranger living among the villagers, becomes their best hope for survival. Tasked with finding trained fighters who will unite with her in making an impossible stand against the Mother World, Kora assembles a small band of warriors -- outsiders, insurgents, peasants and orphans of war from different worlds who share a common need for redemption and revenge. As the shadow of an entire Realm bears down on the unlikeliest of moons, a battle over the fate of a galaxy is waged, and in the process, a new army of heroes is formed."
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
    id:10,
    title: "The Covenant",
    rating: "84%",
    genre: {
    name: "War",
    description: "During the war in Afghanistan, a local interpreter risks his own life to carry an injured sergeant across miles of grueling terrain."
    },
    director: {
      name:"Guy Ritchie",
      bio: "Guy Ritchie is a British film director, writer, producer, and businessman12345. He is known for his trademark crime thrillers and suspense films, such as 'Lock, Stock and Two Smoking Barrels' and 'Snatch'1234. Ritchie left school at age 15 and worked entry-level jobs in the film industry before going on to direct television commercials2. He has also directed the Sherlock Holmes films starring Robert Downey Jr.24. Ritchie is occasionally an actor, pub landlord, and businessman",
      birth: "1968",
    },
    imageURL:"express/pictures/The Covenant.jpeg",
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

  app.get('/movie/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });

  app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) =>
      { return movie.title === req.params.title }));
  });

  app.get('/movies/:rating', (req, res) => {
    res.json(movies.find((movie) =>
      { return movie.rating === req.params.rating }));
  });

  app.get('/movies/:genreName', (req, res) => {
    res.json(movies.genreName.find((movie) =>
      { return movie.genreName === req.params.genreName }));
  });

  app.get('/movies/:director', (req, res) => {
    res.json(movies.find((movie) =>
      { return movie.director === req.params.director }));
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
