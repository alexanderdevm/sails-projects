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
    if (!req.session.useId) {
      return res.view('homepage', {
        me: null
      });
    }

    User.findOne(req.session.userId, function (err, user) {
      if (err) { return res.negotiate(err); }

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
          gravatarURL: user.gravatalURl,
          admin: user.admin
        }
      });
    });
  }
};
