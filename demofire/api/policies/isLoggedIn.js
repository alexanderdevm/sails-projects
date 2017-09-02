module.exports = function isLoggedIn(req, res, next) {
  'use strict';

  if (req.session.userId) {
    return next();
  }

  if (req.wantsJSON) {
    return res.forbidden('Your are not permissted to perform this action.');
  }

  return res.redirect('/');
};
