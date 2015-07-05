/**
 * Category.js
 *
 * @description :: Model that defines the data structure of a category
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

