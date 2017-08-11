/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
    'use strict';

    Video.count().exec(function (err, numVideos) {
        if (err) {
            return cb(err);
        }

        if (numVideos > 0) {
            console.log('Number of video records: ', numVideos);
            return cb();
        }

        var YouTube = require('machinepack-youtube');

        // List Youtube videos which match the specified search query.
        YouTube.searchVideos({
            query: 'grumpry cat',
            apiKey: 'AIzaSyCun6pFXnqxljO9bHam5nlj7rI9VYlSE1A1',
            limit: 15
        }).exec({
            // An unexpected error occurred
            error: function (err) {
                console.log('an error: ', err);
            },
            // OK
            success: function (result) {
                console.log('the result: ', result);
            }
        });
        return cb();
    });
};
