const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
  Title: { type: String, required: [true, 'Title is required'] },
  Description: { type: String, required: [true, 'Description is required'] },
  Release: { type: String, required: [true, 'Release year is required'] },
  Genre: {
    Name: { type: String, required: [true, 'Genre name is required'] },
    Description: { type: String, required: [true, 'Genre description is required'] }
  },
  Rated: { type: String, required: [true, 'Rating is required'] },
  Rating: {
    type: Number,
    required: true,
    min: [0, 'Rating must be at least 0'],
    max: [100, 'Rating cannot be more than 100']
  },
  Actors: [String],
  Director: {
    Name: { type: String, required: [true, 'Director name is required'] },
    Bio: { type: String, required: [true, 'Director bio is required'] },
    Birth: { type: Date, required: [true, 'Director birth date is required'] },
    Death: { type: Date }
  },
  Image: { type: String, required: [true, 'Poster image URL is required'] },
  Featured: { type: Boolean, default: false },
  url: { type: String, required: [true, 'Movie URL is required'] },
  Saved: { type: Boolean, default: false }
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: [true, 'Username is required'] },
  Password: { type: String, required: [true, 'Password is required'] },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address format'
    }
  },
  Birthday: { type: Date, required: [true, 'Birthday is required'] },
  Favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie.Title' }],
  toggleState: { type: Boolean, default: false }
});

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
}

userSchema.statics.isEmailInUse = async function(email) {
  if (!email) throw new Error('Invalid email');
  try {
    const user = await this.findOne({ Email: email });
    return !!user; // Returns true if email is already in use
  } catch (error) {
    console.log('Error inside isEmailInUse method:', error.message);
    return false;
  }
}

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
