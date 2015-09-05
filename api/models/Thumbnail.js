/**
 * Thumbnail.js
 *
 * @description :: A model definition of mapping between thumbnail and file objects
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    file: {
      type: 'string',
      required: true
    },
    thumbnail: {
      type: 'string',
      required: true
    },
    size: {
      type: 'string',
      required: true,
      defaultsTo: "default"
    }
  }
};

