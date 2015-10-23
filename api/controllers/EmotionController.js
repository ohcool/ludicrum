/**
 * EmotionController
 *
 * @description :: Server-side logic for managing Emotions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  setLike: function (req, res) {
    "use strict";
    let like = req.param('like');
    let targetContentId = req.param('contentId');
    if (like == 1) {

      // Creating edge between user and media
      Media.createEdge(req.user.id, targetContentId, {'@class': 'likes'}, function (err, result) {

        if (err) {
          res.badRequest(err);
          return;
        }

        res.ok(true);

      });
    } else {
      // Assume a model named "Post"
      Media.deleteEdges(req.user.id, targetContentId, {'@class': 'likes'}, function (err, result) {
        if (err) {
          res.badRequest(err);
          return;
        }

        res.ok(true);
      });
    }
  }
};

