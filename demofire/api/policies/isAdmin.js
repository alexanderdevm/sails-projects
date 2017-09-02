/*global User */
module.exports = function isAdmin(req, res, next) {
  'use strict';

  if (!req.session.userId) {
    if (req.wantsJSON) {
      return res.forbidden('You are not permitted');
    }
    return res.redirect('/');
  }

  User.findOne(req.session.userId).exec(function (err, foundUser) {
    if (err) { return res.negotiate(err); }
    if (!foundUser) {
      if (req.wantsJSON) {
        return res.forbidden('You are not permitted');
      }
      return res.redirect('/');
    }
    if (foundUser.admin) {
      return next();
    } else {
      if (req.wantsJSON) {
        return res.forbidden('You are not permitted');
      }
      return res.redirect('/');
    }
  });
};
