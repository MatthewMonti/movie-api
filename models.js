const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { lstatSync } = require('fs');


let movieSchema = mongoose.Schema({
  Title: {type: String, required: [true, 'Title Required']},
  Description: {type: String, required: [true, 'Description is Required Field']},
  Release: {type: String, required: [true, 'Release Year of movie is required']},
  Genre: {
    Name: {
      type: String,
      required: [true, 'Category of Film is Required']
    },
    Description: {type: String, required: [true, 'movie description is Required']}
  },
  Rated: {
    type: String, 
    required: [true,
    'Film needs to have parental guide rating']
  },
  Rating: {
    type: String, 
    required:true,
    min:[0, 'Please enter valid rating no less then 0'],
    max:[100, 'Please enter valid rating no more than 100'],
  },
  Actors: [String],
  Director: {
    Name: {type: String, required:[true, 'Name of Director Required']},
    Bio: {type: String, required:[true, 'Bio info on director required']},
    Birth: {type: Date, required:[true, 'Birth date of director required']},
    Death: {type: Date}
  },
  Image: {type: String, required:[true, 'Poster Image file is missing']},
  Featured: {type: Boolean },
  url: {type: String, required: [true, 'unable to get movie']},
  Favorited: { type: Boolean}
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: [true, 'Username required'] },
    Password: { type: String, required: [true, 'Password required to have account active']},
    Email: {email: 'TEST@test.com',
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email address format',
      },
    },
    Birthday: {type: Date, required: [true, 'Birth date required to have account active']},
    Favorite: [{ type: mongoose.Schema.Types.String, ref: 'Movie' }], // Reference Movie by ObjectId
  toggleState: { type: Boolean, default: false } // Assuming default should be false
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this. Password);
  //this password REFERING to user document 
  //NOT userSchema METHODS
  //=> OMITTED Instance methods 
  //THIS PASSWORD refers to that ONE INDV. USER NOT MODEL
};


userSchema.statics.isThisEmailInUse = async function(email) {
  if(!email) throw new Error('Invalid Email')
  try {
    const user = await this.findOne({email})
    if(user) return false

    return true;

  } catch (error) {
    console.log('error inside isThisEmailInUse method', error.message)
    return false
  }
  }

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;