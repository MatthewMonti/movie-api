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
    "UserName": "Brian",
    "Password": "MoneyWallet#1",
    "Email": "brianmonti@comcast.net",
    "Birthday": "1956-07-14",
    "Favorite-Film":"Raiders of the Lost Ark"
  },
  {
    "UserName": "Laura",
    "Password": "Magicdog#1",
    "Email": "lauramonti@comcast.net",
    "Birthday": "1956-02-10",
    "Favorite-Film":[
      "Barbie",
      "Elemental"
    ]
  },
  {
    "UserName": "Matt",
    "Password": "Cometdog#1",
    "Email": "mattbmonti@outlook.com",
    "Birthday": "1993-09-09",
    "Favorite-Film": 
    "Indiana Jones and the Temple of Doom"
  },
  {
    "UserName": "Michelle",
    "Password": "DanceConnect#123",
    "Email": "michellemonti@comcast.net",
    "Birthday": "1996-05-07",
    "Favorite-Film":"Barbie"
  },
  {
    "UserName": "Ralph Francesconi",
    "Password": "BankRobberCentral",
    "Email": "ralphfran@yahoo.com",
    "Birthday": "1996-08-28",
    "Favorite-Film": "John Wick Chapter 4"
  },
  {
    "UserName": "Ted Korczyk",
    "Password": "WhiteSox#6",
    "Email": "ralphfran@yahoo.com",
    "Birthday": "1958-10-04",
    "Favorite-Film": "12 Angry Men"
  }

]

let movies = [
  {
    "Title": "All Quiet on the Western Front",
    "ReleaseYear":"2022",
    "Actors": [
      "Felix Kammerer", 
      "Albrecht Schuch",
      "Aaron Hilmer", 
      "Daniel Brühl",
      "Devid Striesow"
    ],
    "Rated":"R",
    "Rating":"90%",
    "Description": "The story follows teenagers Paul Baumer and his friends Albert and Muller, who voluntarily enlist in the German army, riding a wave of patriotic fervor that quickly dissipates once they face the brutal realities of life on the front. Paul's preconceptions about the enemy and the rights and wrongs of the conflict soon crumble. However, amid the countdown to armistice, Paul must carry on fighting until the end, with no purpose other than to satisfy the top brass' desire to end the war on a German offensive.",
    "Genre": {
      "Name": "War",
      "Description": "War film is film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century. The fateful nature of battle scenes means that war films often end with them. Themes explored include combat, survival and escape, camaraderie between soldiers, sacrifice, the futility and inhumanity of battle, the effects of war on society, and the moral and human issues raised by war."
    },
    "Director": {
      "Name": "Edward Berger",
      "Bio": "Edward Berger was born in 1970 in Wolfsburg, Lower Saxony, Germany. He is adirector and writer, known for All Quiet on the Western Front (2022), Jack (2014) and Deutschland 83 (2015). He is married to Nele Mueller-Stofen.",
      "Birth": "1970-01-01"
    },
    "ImagePath": "express/pictures/All Quiet on the Western Front.jpg",
    "Featured": false
  },
  {
    "Title": "Barbie",
    "ReleaseYear":"2023",
    "Actors": [
      "Margot Robbie", 
      "Ryan Gosling",
      "Issa Rae", 
      "Kate McKinnon",
      "Emma Mackey"
  ],
    "Rated": "PG-13",
    "Rating": "80%",
    "Description": "Barbie suffers a crisis that leads her to question her world and her existence.",
    "Genre": {
      "Name": "Comedy",
      "Description": "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
    },
    "Director": {
      "Name": "Greta Gerwig",
      "Bio": "Greta Gerwig, in full Greta Celeste Gerwig, (born August 4, 1983, Sacramento, California, U.S), American actress, writer, and director who was known for the radiant artlessness of her performances in small independent movies before embarking on a successful career as a filmmaker.",
      "Birth": "1983-08-04"
    },
    "ImagePath": "express/pictures/Barbie.jpg",
    "Featured": true
  },
  {
    "Title": "Castle in the Sky",
    "ReleaseYear":"1986",
    "Actors": [
      "Mayumi Tanaka", 
      "Keiko Yokozawa",
      "Kotoe Hatsui", 
    ],
    "Rated": "PG",
    "Rating": "96%",
    "Description": "A young boy and a girl with a magic crystal must race against pirates and foreign agents in a search for a legendary floating castle.",
    "Genre": {
      "Name": "Anime",
      "Description": "Anime is hand-drawn and computer-generated animation originating from Japan. Outside Japan and in English, anime refers specifically to animation produced in Japan. However, in Japan and in Japanese, anime a term derived from a shortening of the English word animation describes all animated works, regardless of style or origin. Animation produced outside Japan with a similar style to Japanese animation is commonly referred to as anime-influenced animation."
    },
    "Director": {
      "Name": "Hayao Miyazaki",
      "Bio": "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
      "Birth": "1941-01-05"
    },
    "ImagePath": "express/pictures/Castle in the Sky.jpeg",
    "Featured": false
  },
  {
    "Title": "Elemental",
    "ReleaseYear":"2023",
    "Actors": [
      "Leah Lewis", 
      "Mamoudou Athie",
      "Ronnie del Carmen", 
      "Matthew Yang King"
    ],
    "Rated": "PG",
    "Rating": "74%",
    "Description": "Disney and Pixar's Elemental, an all-new, original feature film set in Element City, where fire-, water-, land- and air-residents live together. The story introduces Ember, a tough, quick-witted and fiery young woman, whose friendship with a fun, sappy, go-with-the-flow guy named Wade challenges her beliefs about the world they live in.",
    "Genre": {
      "Name": "Family",
      "Description": "Family film, is a film genre that contains children or relates to them in the context of home and family. These films are made specifically for children and not necessarily for a general audience, while family films are made for a wider appeal with a general audience in mind."
    },
    "Director": {
      "Name": "Peter Sohn",
      "Bio": "Peter Sohnn is an American animator, filmmaker, and voice actor, best known for his work at Pixar Animation Studios. He directed the short film Partly Cloudy 2009 and the feature films The Good Dinosaur 2015 and Elemental 2023. He has also been the voice of Emile in Ratatouille (2007), Squishy in Monsters University 2013, and Sox in Lightyear 2022",
      "Birth": "1977-10-18"
    },
    "ImagePath": "express/pictures/Elemental.jpg",
    "Featured": true
  },
  {
    "Title": "Guardians of the Galaxy Vol.3",
    "ReleaseYear":"2023",
    "Actors": [
      "Chris Pratt", 
      "Zoe Saldana",
      "Dave Bautista", 
      "Karen Gillan"
  ],
    "Rated": "PG-13",
    "Rating": "82%",
    "Description": "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe",
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition."
    },
    "Director": {
      "Name": "James Gunn",
      "Bio": "James Francis Gunn Jr. is an American filmmaker and studio executive. He began his career as a screenwriter in the mid-1990s, starting at Troma Entertainment with Tromeo and Juliet 1997. He then began working as a director, starting with the horror-comedy film Slither 2006, and moving to the superhero genre with Super 2010, Guardians of the Galaxy 2014, Guardians of the Galaxy Vol. 2 2017, The Suicide Squad 2021, and Guardians of the Galaxy Vol. 3 2023. In 2022, Warner Bros. Discovery hired Gunn and Peter Safran to become co-chairmen and co-CEOs of DC Studios.",
      "Birth": "1966-08-05"
    },
    "ImagePath": "express/pictures/Guardian of the Galaxy Vol.3.png",
    "Featured": true
  },
  {
    "Title": "Indiana Jones and the Temple of Doom",
    "ReleaseYear":"1984",
    "Actors": [
      "Harrison Ford", 
      "Kate Capshaw",
      "Ke Huy Quan", 
      "Amrish Puri"
    ],
    "Rated":"PG",
    "Rating":"77%",
    "Description": "In 1935, Indiana Jones is tasked by Indian villagers with reclaiming a rock stolen from them by a secret cult beneath the catacombs of an ancient palace.",
    "Genre": {
      "Name": "Adventure",
      "Description": "Adventure fiction is a type of fiction that usually presents danger, or gives the reader a sense of excitement. Some adventure fiction also satisfies the literary definition of romance fiction."
    },
    "Director": {
      "Name": "",
      "Bio": "Steven Spielburg is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history. He is the recipient of many accolades, including three Academy Awards, two BAFTA Awards, and four Directors Guild of America Awards, as well as the AFI Life Achievement Award in 1995, the Kennedy Center Honor in 2006, the Cecil B. DeMille Award in 2009 and the Presidential Medal of Freedom in 2015. Seven of his films have been inducted into the National Film Registry by the Library of Congress as culturally, historically or aesthetically significant",
      "Birth": "1946-12-18"
    },
    "ImagePath": "express/pictures/Temple of Doom.jpg",
    "Featured": true
  },
  {
    "Title": "Insidious Last Key",
    "ReleaseYear":"2018",
    "Actors": [
      "Harrison Ford", 
      "Kate Capshaw",
      "Ke Huy Quan", 
      "Amrish Puri"
  ],
    "Rated":"PG-13",
    "Rating": "33%",
    "Description": "Parapsychologist Dr. Elise Rainier faces her most fearsome and personal haounting yet, as she is drawn back to her ghostly childhood home where the terror began.",
    "Genre": {
      "Name": "Horror",
      "Description": "Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes. Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs."
    },
    "Director": {
      "Name": "Adam Robitel",
      "Bio": "Adam Robitel is an American film director, producer, screenwriter, and actor. He is best known for directing horror films, such as The Taking of Deborah Logan 2014, Insidious: The Last Key 2018, Escape Room 2019 and its sequel Escape Room: Tournament of Champions 2021. He also co-wrote Paranormal Activity: The Ghost Dimension 2015.",
      "Birth": "1978-05-26"
    },
    "ImagePath": "express/pictures/Insidous Last key.jpeg",
    "Featured": true
  },
  {
    "Title": "John Wick - Chapter 4",
    "ReleaseYear":"2023",
    "Actors": [
      "Keanu Reeves", 
      "Laurence Fishburne",
      "Lance Reddick", 
      "Clancy Brown"
  ],
    "Rated": "R",
    "Rating": "94%",
    "Description": "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    "Genre": {
      "Name": "Action",
      "Description": "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero."
    },
    "Director": {
      "Name": "Chad Stahelski",
      "Bio": "Chad Stahelski is an American stuntman, actor, and film director. He was born on September 20, 1968 in the United States13. He is best known for directing the John Wick film series12. He has also worked as a stuntman, stunt coordinator, and second unit director on several films.",
      "Birth": "1968-09-20"
    },
    "ImagePath": "express/pictures/John Wick - Chapter 4.jpg",
    "Featured": true
  },
  {
    "Title": "Raiders of the Lost Ark",
    "ReleaseYear":"1981",
    "Actors": [
      "Harrison Ford", 
      "Karen Allen",
      "Paul Freeman", 
      "John Rhys-Davies"
    ],
    "Rated": "PG",
    "Rating": "93%",
    "Description": "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before the Nazis can obtain its awesome powers.",
    "Genre": {
      "Name": "Adventure",
      "Description": "Adventure fiction is a type of fiction that usually presents danger, or gives the reader a sense of excitement. Some adventure fiction also satisfies the literary definition of romance fiction."
    },
    "Director": {
      "Name": "Steven Spielburg",
      "Bio": "Steven Spielburg is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history. He is the recipient of many accolades, including three Academy Awards, two BAFTA Awards, and four Directors Guild of America Awards, as well as the AFI Life Achievement Award in 1995, the Kennedy Center Honor in 2006, the Cecil B. DeMille Award in 2009 and the Presidential Medal of Freedom in 2015. Seven of his films have been inducted into the National Film Registry by the Library of Congress as culturally, historically or aesthetically significant",
      "Birth": "1946-12-18"
    },
    "ImagePath": "express/pictures/Raiders of the Lost Ark.jpg",
    "Featured": true
  },
  {
    "Title": "Rebel Moon: Part One – A Child of Fire",
    "ReleaseYear":"2023",
    "Actors": [
      "Sofia Boutella", 
      "Cary Elwes",
      "Charlie Hunnam", 
      "Anthony Hopkins"
    ],
    "Rated": "PG-13",
    "Rating":"100%",
    "Description": "When a peaceful colony on the edge of a galaxy finds itself threatened by the armies of a tyrannical ruling force, Kora (Sofia Boutella), a mysterious stranger living among the villagers, becomes their best hope for survival. Tasked with finding trained fighters who will unite with her in making an impossible stand against the Mother World, Kora assembles a small band of warriors -- outsiders, insurgents, peasants and orphans of war from different worlds who share a common need for redemption and revenge. As the shadow of an entire Realm bears down on the unlikeliest of moons, a battle over the fate of a galaxy is waged, and in the process, a new army of heroes is formed.",
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition."
    },
    "Director": {
      "Name": "Zack Snyder",
      "Bio": "Snyder is known for his highly stylized Spartan epic, 300 (2007), a box-office smash based on the graphic novel by Frank Miller. Snyder then went to make Watchmen (2009), the ground-breaking comic book miniseries written by Alan Moore. Looking to work on something fraught with less potential for controversy, he helmed the CGI family fantasy Legend of the Guardians: The Owls of Ga'Hoole (2010), then wrote, produced and directed the wildly self-indulgent genre mash-up spectacle Sucker Punch (2011), about a young girl (Emily Browning) who escapes the real world horrors of a mental asylum by retreating into her own fantasies. Resuscitating the Superman franchise with the highly-anticipated Man of Steel (2013) was merely one more make-or-break challenge for the director. Accused of favoring style over substance by his detractors, Snyder unapologetically offered up his films to the fans as pure popcorn entertainment.",
      "Birth": "1966-03-01"
    },
    "ImagePath": "express/pictures/Rebel-Moon.webp",
    "Featured": false
  },
  {
    "Title": "The Covenant",
    "ReleaseYear":"2023",
    "Actors": [
      "Jake Gyllenhaai", 
      "Dar Salim",
      "Jason Wong", 
      "Rhys Yates"
    ],
    "Rated": "R",
    "Rating": "83%",
    "Description": "During the war in Afghanistan, a local interpreter risks his own life to carry an injured sergeant across miles of grueling terrain.",
    "Genre": {
      "Name": "War",
      "Description": "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century.[1][2] The fateful nature of battle scenes means that war films often end with them. Themes explored include combat, survival and escape, camaraderie between soldiers, sacrifice, the futility and inhumanity of battle, the effects of war on society, and the moral and human issues raised by war."
    },
    "Director": {
      "Name": "Guy Ritchie",
      "Bio": "Guy Ritchie is a British film director, writer, producer, and businessman12345. He is known for his trademark crime thrillers and suspense films, such as Lock, Stock and Two Smoking Barrels and Snatch1234. Ritchie left school at age 15 and worked entry-level jobs in the film industry before going on to direct television commercials2. He has also directed the Sherlock Holmes films starring Robert Downey Jr.24. Ritchie is occasionally an actor, pub landlord, and businessman",
      "Birth": "1924-06-25",
      "Death": "2011-04-09"
    },
    "ImagePath": "express/pictures/The Covenant.jpeg",
    "Featured": true
  },
  {
    "Title": "12 Angry Men",
    "Actors": [
      "Ed Begley",
      "E.G Marshall",
      "Edward Binns",
      "George Voskovec",
      "Henry Fonda",
      "Jack Klugman",
      "Jack Warden",
      "John Fiedler",
      "Joseph Sweeney",
      "Lee J. Cobb",
      "Martin Balsam", 
      "Robert Webber",
    ],
    "ReleaseYear":"1957", 
    "Rated": "NA",
    "Rating": "100%",
    "Description": "Angry Men is a 1957 American legal drama film directed by Sidney Lumet, adapted from a 1954 teleplay of the same name by Reginald Rose. The film tells the story of a jury of 12 men as they deliberate the conviction or acquittal of a teenager charged with murder on the basis of reasonable doubt; disagreement and conflict among them force the jurors to question their morals and values.",
    "Genre": {
      "Name": "Drama",
      "Description": "In film and television, drama is a category or genre of narrative fiction or semi-fiction intended to be more serious than humorous in tone. The drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama. These terms tend to indicate a particular setting or subject matter, or they combine a drama's otherwise serious tone with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline."
    },
    "Director": {
      "Name": "Guy Ritchie",
      "Bio": "'Lumet started his career in theatre before transitioning to film where he gained a reputation for making realistic and gritty New York dramas which focused on the working class, tackled social injustices and often questioned authority. Lumet is often identified as part of the New Hollywood wave of filmmakers such as Martin Scorsese, Robert Altman, Francis Ford Coppola, George Lucas, and Woody Allen",
      "Birth": "1968-09-10"
    },
    "ImagePath": "express/pictures/12 Angry Men.jpeg",
    "Featured": true
  },
  {
    "Title": "Witness for the Prosecution",
    "ReleaseYear":"1957",
    "Actors": [
      "Tyrone Power",
      "Marlene Dietrich",
      "Charles Laughton",
      "Elsa Lanchester",
      "James Williams"
    ],

    "Rated": "NR",
    "Rating":"100",
    "Description": "A courtroom drama about a young man on trial for a wealthy widow's murder after he suspiciously profits from her will.",
    "Genre": {
    "Name": "Drama",
    "Description": "In film and television, drama is a category or genre of narrative fiction or semi-fiction intended to be more serious than humorous in tone. The drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama. These terms tend to indicate a particular setting or subject matter, or they combine a drama's otherwise serious tone with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline.",
    "Director": {
      "Name": "Billy Wildere",
      "Bio": "American motion-picture scenarist, director, and producer known for films that humorously treat subjects of controversy and offer biting indictments of hypocrisy in American life. His work often focused on subjects that had previously been considered unacceptable screen material, including alcoholism (The Lost Weekend, 1945), prisoner-of-war camps (Stalag 17, 1953), and prostitution (Irma La Douce, 1963). A number of his films, such as Sunset Boulevard (1950) and The Apartment (1960), weighed the emptiness of modern life.",
      "Birth": "1906-06-22",
      "Death": "2002-03-27"
    },
    "ImagePath": "express/pictures/Witness for the Prosecution.jpeg",
    "Featured": true
  }
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