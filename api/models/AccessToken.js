/**
 * AccessToken
 *
 * @module      :: AccessToken Model
 * @description :: Defines the data structure how access tokens are stored using configured connection.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    userId: {
      type: 'string',
      required: true
    },
    clientId: {
      type: 'string',
      required: true
    },
    token: 'string',
    scope: 'string'

  },

  beforeCreate: function (values, next) {
    values.token = UtilsService.uid(256);
    next();
  }

};
