const jwtSecret ='HurricanCO2Cool'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport.js'); // Your local passport file


let generateJWTToken = (User) => {
  return jwt.sign(User, jwtSecret, {
    subject: User.Username, // This is the username you’re encoding in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256' // This is the algorithm used to “sign” or encode the values of the JWT
  });
}


/* POST login. */
module.exports = (router) => {
  router.post('/user/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, User, info) => {
      if (error || !User) {
        return res.status(400).json({
          message: 'Something is not right',
          User: User
        });
      }
      req.login(User, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(User.toJSON());
        return res.json({ User, token });
      });
    })(req, res);
  });
}