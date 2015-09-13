/**
 * AuthCode
 *
 * @module      :: Authorization Code Model
 * @description :: Defines the data structure how authorization codes generated to retrieve access tokens are stored using configured connection.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    code: {
      type: 'string'
    },
    userId: {
      type: 'string',
      required: true
    },
    clientId: {
      type: 'string',
      required: true
    },
    redirectURI: {
      type: 'string',
      required: true
    }

  },

  beforeCreate: function (values, next) {
    values.code = UtilsService.uid(16);
    next();
  }

};
