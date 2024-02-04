function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var mongoose = require('mongoose');
var Models = require('./models.js');
var Movies = Models.Movie;
var Users = Models.User;
mongoose.connect(process.env.URL_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Mongoose Connected');
})["catch"](function (err) {
  console.error(err);
});
var express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan');
uuid = require('uuid');
fs = require('fs');
path = require('path');
var app = express();
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var cors = require('cors');
var allowedOrigins = ['https://movies-flex-6e317721b427.herokuapp.com'];
var _require = require('express-validator'),
  check = _require.check,
  validationResult = _require.validationResult;
app.use(cors({
  origin: function origin(_origin, callback) {
    if (!_origin) return callback(null, true);
    if (allowedOrigins.indexOf(_origin) === -1) {
      // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + _origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));
var auth = require('./auth.js')(app);
var passport = require('passport');
var _require2 = require('lodash'),
  isArray = _require2.isArray;
var _require3 = require('mongodb'),
  ObjectId = _require3.ObjectId;
require('./passport.js');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
  flags: 'a'
});
app.use(morgan('combined', {
  stream: accessLogStream
}));

//WELCOME MESSAGE 
app.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          res.status(200).send("Welcome to myFlix Movie Database"), req.responseText += '<small>Requested at: ' + req.requestTime + '</small>';
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//WELCOME MESSAGE 
app.get('/api/about', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          res.status(200).sendFile('./public/doc.html', {
            root: __dirname
          });
          req.responseText += '<small>Requested at: ' + req.requestTime + '</small>';
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

//MOVIES LIST 
app.get('/api/movies', passport.authenticate('jwt', {
  session: false
}), /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Movies.find().then(function (movies) {
            res.status(201).json(movies);
          })["catch"](function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

//TITLE SEARCH 
app.get('/api/movies/title/:label', passport.authenticate('jwt', {
  session: false
}), /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return Movies.find({
            Title: req.params.label
          }).then(function (label) {
            if (label.length == 0) {
              res.status(400).send(req.params.label + ' movie title not in database.');
            } else {
              res.status(200).json(label);
            }
          })["catch"](function (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
          });
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

//RELEASE YEAR 
app.get('/api/movies/release/:year', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return Movies.find({
            Release: req.params.year
          }).then(function (year) {
            if (year.length == 0) {
              res.status(400).send(req.params.year + " film year does not have any movies yet or invalid year");
            } else {
              res.status(200).json(year);
            }
          })["catch"](function (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
          });
        case 2:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

//RATED FOR FIND APPROPRIATE AUDIENCE WORKS 
app.get('/api/movies/rated/:audience', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return Movies.find({
            Rated: req.params.audience
          }).then(function (audience) {
            if (audience.length == 0) {
              res.status(400).send(req.params.audience + ' demographic is either not serviced by database or is invalid entry.');
            } else {
              res.status(200).json(audience);
            }
          })["catch"](function (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
          });
        case 2:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

//Quality of FILMS WORKS
app.get('/api/movies/rating/:percentage', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return Movies.find({
            Rating: req.params.percentage
          }).then(function (percentage) {
            if (percentage.length == 0) {
              res.status(400).send(req.params.percentage + ' rotten tomatoes percentage is either a rating that is yet to match a film in our database or invalid percentage outside the range of (0-100)');
            } else {
              res.status(200).json(percentage);
            }
          })["catch"](function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
        case 2:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

//GENRE SEARCH FOR MOVIE
app.get('/api/movies/genre/:genreName', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return Movies.find({
            'Genre.Name': req.params.genreName
          }).then(function (movies) {
            if (movies.length == 0) {
              res.status(400).send(req.params.genreName + ' category not in our database sorry we consider more additions in the future.');
            } else {
              res.status(200).json(movies);
            }
          })["catch"](function (error) {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
        case 2:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());

///DIRECTOR SEARCH WORKS
app.get("/api/movies/director/:name", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          Movies.find({
            'Director.Name': req.params.name
          }).then(function (movies) {
            if (movies.length == 0) {
              res.status(400).send(req.params.name + ' is a director not yet added to database please try someone else.');
            } else {
              res.status(200).json(movies);
            }
          })["catch"](function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());

//Add a user - WORKS error works
app.post('/api/user',
// Validation logic here for request
//you can either use a chain of methods like .not().isEmpty()
//which means "opposite of isEmpty" in plain english "is not empty"
//or use .isLength({min: 5}) which means
//minimum value of 5 characters are only allowed
[check('Username', 'Username is required at least 5 letters').isLength({
  min: 5
}), check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(), check('Password', 'Password is required').not().isEmpty(), check('Email', 'Email does not appear to be valid').isEmail()], /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var errors, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          // check the validation object for errors
          errors = validationResult(req);
          if (errors.isEmpty()) {
            _context10.next = 3;
            break;
          }
          return _context10.abrupt("return", res.status(422).json({
            errors: errors.array()
          }));
        case 3:
          hashedPassword = Users.hashPassword(req.body.Password);
          _context10.next = 6;
          return Users.findOne({
            Username: req.body.Username
          }) // Search to see if a user with the requested username already exists
          .then(function (user) {
            if (user) {
              //If the user is found, send a response that it already exists
              return res.status(400).send(req.body.Username + ' user is already in our records please try another user');
            } else {
              Users.create({
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday
              }).then(function (user) {
                res.status(201).json(user);
              })["catch"](function (error) {
                console.error(error);
                res.status(500).send('Error: ' + error);
              });
            }
          })["catch"](function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
        case 6:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());

/// USER CAN UPDATE FOLLOWING - WORKS
// USER NAME
//EMAIL
//BIRTHDAY 
app.put('/api/user/:identity',
// Validation logic here for request
//you can either use a chain of methods like .not().isEmpty()
//which means "opposite of isEmpty" in plain english "is not empty"
//or use .isLength({min: 5}) which means
//minimum value of 5 characters are only allowed
[check('Username', 'Username is required').isLength({
  min: 5
}), check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(), check('Password', 'Password is required').not().isEmpty(), check('Email', 'Email does not appear to be valid').isEmail()], passport.authenticate('jwt', {
  session: false
}), /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var errors, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          // check the validation object for errors
          errors = validationResult(req);
          if (errors.isEmpty()) {
            _context11.next = 3;
            break;
          }
          return _context11.abrupt("return", res.status(422).json({
            errors: errors.array()
          }));
        case 3:
          if (!(req.user.id !== req.params.identity)) {
            _context11.next = 5;
            break;
          }
          return _context11.abrupt("return", res.status(400).send('Permission denied'));
        case 5:
          // CONDITION ENDS
          hashedPassword = Users.hashPassword(req.body.Password);
          _context11.next = 8;
          return Users.findByIdAndUpdate({
            _id: req.params.identity
          }, {
            $set: {
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            }
          }, {
            "new": true
          }) // This line makes sure that the updated document is returned
          .then(function (updatedUser) {
            res.json(updatedUser);
          })["catch"](function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
        case 8:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());

// Delete a user by username - WORKS
app["delete"]('/api/user/:identity', passport.authenticate('jwt', {
  session: false
}), /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return Users.findByIdAndDelete({
            _id: req.params.identity
          }).then(function (identity) {
            res.status(200).send(req.params.identity + ' user was removed from our records.');
          })["catch"](function (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
          });
        case 2:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());

// Add a movie to a user's list of favorites
app.post('/api/user/favorite/:identity/:add', passport.authenticate('jwt', {
  session: false
}), /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return Users.findByIdAndUpdate({
            _id: req.params.identity
          }, {
            $addToSet: {
              Favorite: req.params.add
            }
          }, {
            "new": true
          }) // This line makes sure that the updated document is returned
          .then(function (add) {
            res.status(200).send(req.params.add + ' film id being added to favorites.');
          })["catch"](function (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
          });
        case 2:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());

// Delete a movie to a user's list of favorites
app["delete"]('/api/user/favorite/:identity/:remove', passport.authenticate('jwt', {
  session: false
}), /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return Users.findByIdAndUpdate({
            _id: req.params.identity
          }, {
            $pull: {
              Favorite: req.params.remove
            }
          }, {
            "new": true
          }) // This line makes sure that the updated document is returned
          .then(function (remove) {
            res.status(200).send(req.params.remove + ' favorite film id deleted.');
          })["catch"](function (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
          });
        case 2:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
var logwebpage = function logwebpage(req, res, next) {
  console.log(req.url);
  next();
};
var requestTime = function requestTime(req, res, next) {
  req.requestTime = Date.now();
  next();
};
app.use(logwebpage);
app.use(requestTime);

// listen for requests
var port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', function () {
  console.log('Listening on Port ' + port);
});