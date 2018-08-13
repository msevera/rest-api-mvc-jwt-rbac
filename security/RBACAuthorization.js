const RBAC = require('rbac').default;

class RBACAuthorization {
  constructor() {
    this.roles = {
      guest: 'Guest',
      basic: 'BasicUser',
      admin: 'AdminUser',
    };

    this.accessLevels = [
      {
        role: this.roles.guest,
        level: 10,
      }, {
        role: this.roles.basic,
        level: 20,
      }, {
        role: this.roles.admin,
        level: 30,
      }];

    this.rbac = new RBAC({
      roles: this.accessLevels.map(al => al.role),
      permissions: {
        IndexController: [
          'index',
        ],
        BooksListController: [
          'getBook',
          'removeBook',
          'rateBook',
        ],
      },
      grants: {
        Guest: [
          'index_IndexController',
          'getBook_BooksListController',
        ],
        BasicUser: [
          'Guest',
          'rateBook_BooksListController',
        ],
        AdminUser: [
          'BasicUser',
          'removeBook_BooksListController',
        ],
      },
    }, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  getGuestAccessLevel() {
    return this.accessLevels.find(lvl => lvl.role === this.roles.guest);
  }

  hasAccess(role, controller, action, cb) {
    this.rbac.can(role, action, controller, cb);
  }

  canAny(role, permissions, cb) {
    this.rbac.canAny(role, permissions, cb);
  }

  authorize(controller, action) {
    return (req, res, next) => this.rbac.can(req.user.role, action, controller, (err, can) => {
      if (err) return next(err);
      if (!can) {
        const errorResponse = {
          error_description: {
            type: 'access_denied',
            message: 'Access denied',
          },
        };
        const accessLevel = this._minNeededAccessLevel(controller, action);

        if (accessLevel != null) {
          errorResponse.accessLevel = accessLevel;
        }

        return res.status(403).send(errorResponse);
      }

      next();
    });
  }

  _minNeededAccessLevel(controller, action) {
    const roles = this._whoCan(controller, action);
    const rolesAccessLevels = this.accessLevels.filter(al => roles.includes(al.role))
      .map(al => al.level);

    return rolesAccessLevels.length > 0 ? Math.min(...rolesAccessLevels) : null;
  }

  _whoCan(controller, action) {
    const rolesIncludePermission = [];
    this.rbac.getRoles((err, roles) => {
      if (err) throw err;

      roles.forEach((role) => {
        role.can(action, controller, (err2, can) => {
          if (err2) throw err2;

          if (can) {
            rolesIncludePermission.push(role.name);
          }
        });
      });
    });

    return rolesIncludePermission;
  }
}

module.exports = RBACAuthorization;
