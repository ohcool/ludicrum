/**
 * CommentLike.js
 *
 * @description :: A model that defines the data structure of a like for a comment.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'User',
      required: true
    },
    comment: {
      model: 'Comment',
      required: true
    }
  }
};

