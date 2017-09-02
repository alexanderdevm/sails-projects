/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*global User, sails */
module.exports = {
  showHomePage: function (req, res) {
    'use strict';
    if (!req.session.userId) {
      return res.view('homepage', {
        me: null
      });
    }

    User.findOne(req.session.userId, function (err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists!');
        return res.view('homepage', {
          me: null
        });
      }

      return res.view('homepage', {
        me: {
          id: user.id,
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },
  showVideosPage: function (req, res) {
    'use strict';
    if (!req.session.userId) {
      return res.view('videos', {
        me: null
      });
    }

    User.findOne(req.session.userId, function (err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists!');
        return res.view('videos', {
          me: null
        });
      }

      return res.view('videos', {
        me: {
          id: user.id,
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  showAdminPage: function (req, res) {
    'use strict';

    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function (err, user) {
      if (err) {
        return res.negotiate(err);
      }
      if (!user) {
        sails.log.verbose('Session refers to a user no longer exists');
        return res.view('homepage');
      }
      if (user.admin) {
        return res.view('adminUsers', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          }
        });
      } else {
        return res.view('homepage', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          }
        });
      }
    });
  },
  showProfilePage: function (req, res) {
    'use strict';
    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function (err, user) {
      if (err) {
        console.log('error:', err);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists');
        return res.view('homepage');
      }

      return res.view('profile', {
        me: {
          id: user.id,
          email: user.email,
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },
  showEditProfilePage: function (req, res) {
    'use strict';

    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function (err, user) {
      if (err) {
        console.log('error: ', err);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.view('homepage');
      }

      return res.view('edit-profile', {
        me: {
          id: user.id,
          email: user.email,
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },
  showRestorePage: function (req, res) {
    'use strict';

    if (req.session.userId) {
      return res.redirect('/');
    }

    return res.view('restore-profile', {
      me: null
    });
  },
  showSignupPage: function (req, res) {
    'use strict';

    if (req.session.userId) {
      return res.redirect('/');
    }

    return res.view('signup', {
      me: null
    });
  }
};
