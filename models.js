const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  ReleaseYear: {type: String, required: true},
  Genre: {
    Name: {type: String, required: true},
    Description: {type: String, required: true}
  },
  Rated: {type: String, required: true},
  Rating: {type: String, required:true},
  Actors: [String],
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
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email address format',
      },
    },
    Birthday: {type: Date, required: true},
    Favorite: [{ type: mongoose.Schema.Types.String, ref: 'Movie.Title' }],
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
    if(User) return false

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


  



  
  