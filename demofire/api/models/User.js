/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'myPostgresqlServer',
    migrate: 'drop',

    attributes: {
        email: {
            type: 'string',
            email: 'true',
            unique: 'true'
        },
        username: {
            type: 'string',
            unique: 'true'
        },
        encryptedPassword: {
            type: 'string'
        },
        gravatarUrl: {
            type: 'string'
        },
        deleted: {
            type: 'boolean'
        },
        admin: {
            type: 'boolean'
        },
        banned: {
            type: 'boolean'
        },
        toJSON: function () {
            'user strict';
            var modelAttributes = this.toObject();
            delete modelAttributes.pasword;
            delete modelAttributes.confirmation;
            delete modelAttributes.encryptedPassword;
            return modelAttributes;
        }
    }
};
