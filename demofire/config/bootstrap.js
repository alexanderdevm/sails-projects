/*global sails, _ */
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
var YouTube = require('machinepack-youtube');

module.exports.bootstrap = function (cb) {
    'use strict';

    Video.count().exec(function (err, numVideos) {
        if (err) {
            return cb(err);
        }

        if (numVideos > 0) {
            console.log('Existing video records: ', numVideos);
            return cb();
        }

        // List Youtube videos which match the specified search query.
        YouTube.searchVideos({
            query: 'grumpry cat',
            apiKey: sails.config.google.apiKey,
            limit: 15
        }).exec({
            // An unexpected error occurred
            error: function (err) {
                console.log('an error: ', err);
                return cb(err);
            },
            // OK
            success: function (foundVideos) {
                _.each(foundVideos, function (video) {
                    video.src =
                        'http://www.youtube.com/embed/' + video.id;
                    delete video.description;
                    delete video.publishedAt;
                    delete video.id;
                    delete video.url;
                });

                Video.create(foundVideos).exec(function (
                    err, videRecordsCreated) {
                    if (err) {
                        return cb(err);
                    }
                    console.log(videRecordsCreated);
                    return cb();
                });
            }
        });
    });
};
