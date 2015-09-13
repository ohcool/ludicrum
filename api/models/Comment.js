/**
 * Comment.js
 *
 * @description :: A model that defines the data structure and model level validation rules for Comments
 * and also defines the relationship to relate the likes for each comment
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

