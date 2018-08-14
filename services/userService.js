const crypto = require('crypto');

class UserService {
  static encryptPassword(password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
  }

  static checkPassword(hashedPassword, salt, password) {
    return hashedPassword && this.encryptPassword(password, salt) === hashedPassword;
  }
}

module.exports = UserService;
