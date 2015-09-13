/* global GFS */
/* global Files */
/**
 * FileTestApiController
 *
 * @description :: Server-side logic for managing Filetestapis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

import path from 'path';

let streamFile = function (readOptions, req, res) {
  "use strict";

  //Retrieve file metadata information and then serve the file
  Files.findOne(readOptions)
    .then((file, err)=> {

      if (!file || err) {
        res.notFound("The file doesn't exist!!!");
        return;
      }

      if (req.headers['range']) {

        // Range request, partialle stream the file
        //console.log('Range Reuqest');
        let parts = req.headers['range'].replace(/bytes=/, "").split("-");
        let partialstart = parts[0];
        let partialend = parts[1];

        let start = parseInt(partialstart, 10);
        let end = partialend ? parseInt(partialend, 10) : file.length - 1;
        let chunksize = (end - start) + 1;

        console.log('Range ', start, '-', end);

        res.writeHead(206, {
          'Content-Range': 'bytes ' + start + '-' + end + '/' + file.length,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': file.contentType
        });

        readOptions.range = {
          startPos: start,
          endPos: end
        };
      }

      GFS.createReadStream(readOptions, stream => stream.pipe(res), err=> res.notFound(err));
    });
}

module.exports = {

  download: function (req, res) {
    "use strict";

    var filename = req.param('filename');

    GFS.createReadStream({
        filename: filename
      },
        stream => stream.pipe(res),
        err=> res.notFound(err));
  },

  isThumbnailReady: function (req, res) {
    "use strict";
    var filename = req.param('filename');
    var readOptions = {filename: path.basename(filename, path.extname(filename) + '.png')};
    Files.findOne(readOptions)
      .then((file, err)=> {
        res.ok({ready: file != undefined, thumb: file && file.filename});
      });

  },

  streamMedia: function (req, res) {
    "use strict";

    var mediaId = req.param('mediaId');

    Media.findOne({mediaId: mediaId})
      .then((media, err)=> {

        if (err) {
          return res.notFound("Media not found!");
        }

        streamFile({filename: media.file}, req, res);

      });
  },

  stream: function (req, res) {
    "use strict";
    let filename = req.param('filename');

    streamFile({filename: filename}, req, res);
  },

  upload: function (req, res) {
    "use strict";

    var blobAdapter = GFS.getSkipper();

    req.file('file')
      .upload(blobAdapter.receive(), (err, uploadedFiles)=> {
        if (err) return res.negotiate(err);
        else {
          var uploadedFile = uploadedFiles[0];

          Thumbnailer.queue(uploadedFile.fd);
          return res.ok({
            files: uploadedFiles,
            textParams: req.params.all()
          });
        }
      });

    /*req.file('file').upload({
     adapter: require('sails-skipper-orientdb'),
     filesCollection: Files,
     filesChunksCollection: FilesChunks,
     maxChunkSize: 512000
     }, function (err) {
     res.json(err);
     });*/

  }
};

