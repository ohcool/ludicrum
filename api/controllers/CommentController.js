/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    "use strict";
    var newComment = req.body;


    Comment.create({content: newComment.content})
      .then((comment, err) => {
        if (err) {
          res.badRequest(err);
          return;
        }

        //creating commented relationship between user and comment
        Comment.createEdge(req.user.id, comment.id, {'@class': 'commented'}).then((result, err)=> {

          if (err) {
            res.badRequest(err);
            return;
          }

          //creating forContent relationship between content and comment
          Comment.createEdge(comment.id, newComment.contentId, {'@class': 'forContent'}).then((result, err)=> {

            if (err) {
              res.badRequest(err);
              return;
            }

            res.ok(comment);

          });


        });

      });
  },

  getCommentsByContentId: function (req, res) {
    "use strict";
    let contentId = req.param("contentId");
    let skip = req.param("skip");
    let take = req.param("take");

    let query = `select *, first(in('commented').@rid) as userId from (traverse in('forcontent') from ${contentId}) where @class = 'comment' order by createdAt desc skip 0 limit 20`;

    Comment.query(query)
      .then((comments, err)=> {
        if (err) {
          res.badRequest(err);
          return;
        }
        res.ok(comments || []);
      });
  }
};

