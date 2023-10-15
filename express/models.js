const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  ReleaseYear: {type: Integer, required: true},
  Rated: {type: String, required:true},
  Rating: {type: String, required:true},
  Description: {
    Name: {type: String, required:true},
    Bio: {type: String, required:true},
    Birth: {type: Date, required:true},
    Death: {type: Date, required: true}
  },
  ImagePath: {type: String, required: true},
  Featured: {type: Boolean, required: true}
});

let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: {type: Date, required: true},
  "Favorite-Film": {type: mongoose.Schema.ObjectId, ref:'Movie'}
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User; 

