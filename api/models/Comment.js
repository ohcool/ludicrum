/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
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
    likes: {
      collection: 'CommentLike',
      via: 'comment'
    },
    content: {
      type: 'text',
      required: true
    }
  }
};

