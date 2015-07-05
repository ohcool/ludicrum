/**
 * RefreshToken
 *
 * @description :: A model for persisting refresh tokens generated when an access token was generated
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
    token: {
      type: 'string'
    }

  },

  beforeCreate: function (values, next) {
    values.token = UtilsService.uid(256);
    next();
  }

};
