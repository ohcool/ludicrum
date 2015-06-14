/**
 * MediaController
 *
 * @description :: Server-side logic for managing Media
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: (req, res)=> {
    "use strict";
    var media = req.param;
    media.status = 'draft';

    Media.create(media)
      .then((media, err)=> {
        if (err) {
          res.badRequest(err);
          return;
        }

        res.json(media);

      });
  },
  update: (req, res)=> {
    "use strict";
    var media = req.param;

    Media.update({id: media.id}, media)
      .exec((err, mediaUpdated)=> {
        if (err) {
          res.badRequest(err);
          return;
        }

        res.json(mediaUpdated);

      });
  },
  attachFile: (req, res)=> {
    "use strict";
    var mediaId = req.param('media'),
      fileId = req('file'),
      status = req('status');

    Media.findOne(mediaId).exec((err, media)=> {
      if (err) return res.badRequest(err);
      if (!media) return res.notFound('Media not found.');
      media.file = fileId;
      media.save((err1, mediaUpdated)=> {
        if (err1)return res.serverError(err1);
        res.json(mediaUpdated);
      });
    });

  }


};

