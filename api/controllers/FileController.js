/* global GFS */
/* global Files */
/**
 * FileTestApiController
 *
 * @description :: Server-side logic for managing Filetestapis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


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

  stream: function (req, res) {
    "use strict";
    var filename = req.param('filename');
    var readOptions = {filename: filename};

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
          var parts = req.headers['range'].replace(/bytes=/, "").split("-");
          var partialstart = parts[0];
          var partialend = parts[1];

          var start = parseInt(partialstart, 10);
          var end = partialend ? parseInt(partialend, 10) : file.length - 1;
          var chunksize = (end - start) + 1;

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
  },

  upload: function (req, res) {
    "use strict";

    var blobAdapter = GFS.getSkipper();

    req.file('file')
      .upload(blobAdapter.receive(), (err, uploadedFiles)=> {
        if (err) return res.negotiate(err);
        else return res.ok({
          files: uploadedFiles,
          textParams: req.params.all()
        });
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

