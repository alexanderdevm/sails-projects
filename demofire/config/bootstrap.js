/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
/*global User,_,sails */
/*jslint node: true */

module.exports.bootstrap = function (cb) {
  'use strict';

  function createTestUsers() {

    var Passwords = require('machinepack-passwords');
    var Gravatar = require('machinepack-gravatar');

    User.findOne({
      email: 'sailsinaction@gmail.com'
    }).exec(function (err, foundUser) {
      if (err) { /**/ }

      if (foundUser) {
        return cb();
      }

      Passwords.encryptPassword({
        password: 'abc123'
      }).exec({
        error: function (err) {
          return cb(err);
        },
        success: function (result) {

          var options = {};

          try {
            options.gravatarURL = Gravatar.getImageUrl({
              emailAddress: 'sailsinaction@gmail.com'
            }).execSync();

          } catch (errr) {
            return cb(errr);
          }

          options.email = 'sailsinaction@gmail.com';
          options.encryptedPassword = result;
          options.username = 'sailsinaction';
          options.deleted = false;
          options.admin = true;
          options.banned = false;
          User.create(options).exec(function (err, createdUser) {
            if (createdUser) { /**/ }
            if (err) {
              return cb(err);
            }
            return cb();
          });
        }
      });
    });
  }
  // Return the number of records in the video model
  Video.count().exec(function (err, numVideos) {
    if (err) {
      return cb(err);
    }

    // If there's at least one log the number to the console.
    if (numVideos > 0) {
      // return cb();
      return createTestUsers();
    }

    // Add machinepack-youtube as a depedency
    var Youtube = require('machinepack-youtube');

    // List Youtube videos which match the specified search query.
    Youtube.searchVideos({
      query: 'grumpy cat',
      apiKey: sails.config.google.apiKey,
      limit: 15
    }).exec({
      // An unexpected error occurred.
      error: function (err) {
        console.log('the error', err);

      },
      // OK.
      success: function (foundVideos) {
        _.each(foundVideos, function (video) {
          video.src = 'https://www.youtube.com/embed/' + video.id;
          delete video.description;
          delete video.publishedAt;
          delete video.id;
          delete video.url;
        });

        Video.create(foundVideos).exec(function (err, videoRecordsCreated) {
          if (videoRecordsCreated) { /**/ }
          if (err) {
            return cb(err);
          }
          // return cb();
          return createTestUsers();
        });
      }
    });
  });


};
