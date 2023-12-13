const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');
const integerValidator = require('mongoose-integer');
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  ReleaseYear: {
    type: String, 
    required: true,
    integer: true
  },
  Genre: {
    Name: {type: String, required: true},
    Description: {type: String, required: true}
  },
  Rated: {
    type: String, 
    required: true,
    integer:true
  },
  Rating: {
    type: String, 
    required:true,
    integer: true},
  Actors: [String],
  Director: {
    Name: {type: String, required:true},
    Bio: {type: String, required:true},
    Birth: {type: Date, default: new Date(), required:true},
    Death: {type: Date, default: new Date()}
  },
  ImagePath: {type: String},
  Featured: {type: Boolean},
});

movieSchema.plugin(mongooseDateFormat);  


movieSchema.plugin(integerValidator);

return mongoose.model('Movie', movieSchema);

let Movie = mongoose.model('Movie', movieSchema);
module.exports.Movie = Movie;


let userSchema = mongoose.Schema({
    Username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true},
      Password: { type: String, required: true},
      Email: {email: "TEST@test.com",
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
      lowercase: true,
      minlength: 10,
      required: true
    },
    Birthday: {type: Date, required: true},
    Favorite: [{ type: mongoose.Schema.Types.String, ref: 'Movie.Title' }],
    Picture: [{type: mongoose.Schema.Types.String, ref: ""}]
});

userSchema.plugin(mongooseDateFormat);  
return mongoose.model('User', userSchema);

userSchema.plugin(integerValidator);

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
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
let User = mongoose.model('User', userSchema);
module.exports.User = User;


  



  
  