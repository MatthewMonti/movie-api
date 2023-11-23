const mongoose = require('mongoose');

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
      unique: true,
      lowercase: true,
      minlength: 10,
      required: true
    },
    Birthday: {type: Date, required: true},
    Favorite: [{ type: mongoose.Schema.Types.String, ref: 'Movie.Title' }],
    Picture: [{type: mongoose.Schema.Types.String, ref: ""}]
});


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


  



  
  