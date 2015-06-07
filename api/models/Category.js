/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  orientDbCalss: 'BaseContent',
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    desc: {
      type: 'text',
      required: true
    },
    parent: {
      type: 'string'
    },
    medias: {
      collection: 'Media',
      via: 'category'
    }
  }
};

