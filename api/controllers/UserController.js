/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  setMediaLike: function () {
    "use strict";

    let mediaID = req.param('filename');

    User.findById(req.user.id)
      .then((user, err)=> {
        if (err) {
          res.badRequest(err);
          return;
        }


      });
  },
  setCommentLike: function () {
    "use strict";

  }
};

