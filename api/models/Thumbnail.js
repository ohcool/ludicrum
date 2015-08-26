/**
 * Thumbnail.js
 *
 * @description :: A model definition of mapping between thumbnail files and media object
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
    },
    thumbnail: {
      model: 'File',
      required: true
    },
    size: {
      type: 'string',
      required: true
    }
  }
};

