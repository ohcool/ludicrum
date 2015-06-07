/**
 * Media.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    title: {
      type: 'string',
      unique: true
    },
    type: {
      type: 'string',
      defaultsTo: 'video'
    },
    status: {
      type: 'string',
      enum: ['draft', 'published', 'unpublished', 'deleted'],
      required: true,
      defaultsTo: 'draft'
    },
    desc: {
      type: 'text',
      required: true
    },
    category: {
      model: 'Category',
      required: true
    },
    file: {
      type: 'string',
      required: true
    },
    createdBy: {
      model: 'User',
      required: true
    },
    updatedBy: {
      model: 'User',
      required: false,
      defaultsTo: ""
    },
    likes: {
      collection: 'MediaLike',
      via: 'media'
    },
    comments: {
      collection: 'Comment',
      via: 'media'
    }
  }
};

