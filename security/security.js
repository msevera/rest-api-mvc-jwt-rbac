const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const { Strategy: AnonymousStrategy } = require('passport-anonymous');
const jwt = require('jsonwebtoken');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const RBACAuthorization = require('./RBACAuthorization');
const UserService = require('../services/userService');

class Security {
  constructor(repository, jwtSecret) {
    this.repository = repository;
    this.rbacAuthorization = new RBACAuthorization();
    this.jwtSecret = jwtSecret;
    this._setStrategies();
  }

  issueToken() {
    return [
      passport.authenticate('basic', {
        session: false,
      }),
      async (req, res) => {
        const { user } = req;
        const token = await jwt.sign({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }, this.jwtSecret);

        res.json(token);
      }];
  }

  authenticate() {
    return [
      passport.authenticate(['jwt', 'anonymous'], {
        session: false,
      }), (req, res, next) => {
        if (!req.user) {
          req.user = {
            role: this.rbacAuthorization.getGuestAccessLevel().role,
          };
        }

        next();
      }];
  }

  authorise(controller, action) {
    return this.rbacAuthorization.authorize(controller, action);
  }

  hasAccess(role, controller, action, cb) {
    return this.rbacAuthorization.hasAccess(role, controller, action, cb);
  }

  canAny(role, permissions, cb) {
    return this.rbacAuthorization.canAny(role, permissions, cb);
  }

  _setStrategies() {
    passport.use(new AnonymousStrategy());

    passport.use(new BasicStrategy((email, password, done) => {
      let user;
      try {
        user = this.repository.user.getByEmail(email);

        if (!user) return done(null, false);

        if (!UserService.checkPassword(user.hashedPassword, user.salt, password)) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(err);
      }
    }));

    passport.use(new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.jwtSecret,
    }, (user, done) => done(null, user)));
  }
}

module.exports = Security;
