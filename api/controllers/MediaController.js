/* global Media */
/**
 * MediaController
 *
 * @description :: Server-side logic for managing Media
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    "use strict";
    var media = req.body;
    media.status = 'draft';

    media.createdBy = media.updatedBy = req.user.id;
    media.mediaId = UtilsService.uidLight(10);

    Media.create(media)
      .then((media, err) => {
        if (err) {
          res.badRequest(err);
          return;
        }

        res.ok(media);

      });
  },
  getByMediaId: function (req, res) {
    "use strict";
    let mediaId = req.param('mediaId');

    Media.findOne({mediaId: mediaId})
      .then((media, err) => {
        if (err) {
          res.badRequest(err);
          return;
        }


        Media.query(`select expand(in('likes').email) from Media where mediaId = '${mediaId}'`)
          .then((emails, err)=> {
            media.likes = emails.length;
            media.liked = _.find(emails, (email)=> email.value == req.user.email) != undefined;
            res.ok(media);
          });


      });

  },
  update: function (req, res) {
    "use strict";
    var media = req.body;

    Media.update({id: media.id}, media)
      .exec((err, mediaUpdated) => {
        if (err) {
          res.badRequest(err);
          return;
        }

        res.ok(mediaUpdated);

      });
  },
  attachFile: function (req, res) {
    "use strict";
    var mediaId = req.param('media'),
      fileId = req('file');

    Media.findOne(mediaId)
      .exec((err, media) => {
        if (err) return res.badRequest(err);
        if (!media) return res.notFound('Media not found.');
        media.file = fileId;

        media.save((err1, mediaUpdated) => {
          if (err1) return res.serverError(err1);
          res.ok(mediaUpdated);
        });
      });

  }


};

