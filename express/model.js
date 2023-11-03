const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required:true},
  ReleaseYear: {type: Number, required: true},
  Actors:[String],
  Rating: {type: String, required:true},
  Genre: {
    Name: {type: String, required: true},
    Description: {type: String, required: true}
  },
  Director: {
    Name: {type: String, required:true},
    Bio: {type: String, required:true},
    Birth: {type: Date, required:true},
    Death: {type: Date}
  },
  ImagePath: {type: String},
  Featured: {type: Boolean},
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: { type: String, required: true},
    Email: {email: "TEST@test.com",
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 10,
    },
    Birthday: {
      type: Date, 
      required: true,
      min: '1923-01-01',
      max: '2014-01-01'
    },
    FavoriteMovies: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Movie' 
    }],
    createdAt: {
      type: Date,
      immutable:  true,
      default: new Date()
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    }
});

let Movie = mongoose.model('Movie', movieSchema);
module.exports.Movie = Movie;
let User = mongoose.model('User', userSchema);
  module.exports.User = User;

  


userSchema.statics.isThisEmailInUse = async function(email) {
  if(!email) throw new Error('Invalid Email')
  try {
    const user = await this.findOne({email})
    if(User) return false

    return true;

  } catch (error) {
    console.log('error inside isThisEmailInUse method', error.message)
    return false
  }
  }

function getUserwithFavFilm(){
    return user.findOne({ title: title })
      .populate('posts').exec((err, posts) => {
        console.log("User selected" + posts);
      })
  }

  
  