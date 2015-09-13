/**
 * Like.js
 *
 * @description :: A model that persists the data of like for media.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'User',
      required: true
    },
    media: {
      model: 'Media',
      required: true
    }
  }
};

