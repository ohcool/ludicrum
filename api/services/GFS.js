/**
 * Created by Srinath Janankiraman on 5/31/15.
 */

var _blobAdapter, _gfs,
  Grid = require('gridfs-stream'),
  fs = require('fs'),
  path = require('path');

var getFS = function (callback) {
  "use strict";
  if (!_gfs) {
    var mongo = require('mongodb'),
      mongoClient = mongo.MongoClient;

    mongoClient.connect(sails.config.fileRepositories.gridfs.url,
      {}, function (err, db) {
        if (err) throw err;

        _gfs = Grid(db, mongo);
        // all set!
        callback(err, _gfs);
      });
    return;
  }
  callback(undefined, _gfs);
};

exports.getSkipper = function () {
  "use strict";

  if (!_blobAdapter) {
    var gridfs = sails.config.fileRepositories.gridfs;
    _blobAdapter = require('skipper-gridfs')({uri: gridfs.url + '.' + gridfs.root});
  }
  return _blobAdapter;
};


exports.getFS = getFS;

exports.saveFile = function (options, filePath, callback, errCallback) {


  if (!options) {
    options = {};
  }
  if (!options.root) {
    options.root = sails.config.fileRepositories.gridfs.root;
  }

  getFS((err, gfs)=> {

    let readableStream = fs.createReadStream(filePath)

    "use strict";
    var outs = gfs.createWriteStream({
      filename: options.fd,
      root: options.root,
      metadata: {
        fd: options.fd,
        dirname: path.dirname(options.fd)
      }
    });
    readableStream.once('error', errCallback);
    outs.once('error', errCallback);
    outs.once('open', function openedWriteStream() {
      // console.log('opened output stream for',readableStream.fd);
      readableStream.extra = _.assign({fileId: this.id}, this.options.metadata);
    });
    outs.once('close', function doneWritingFile(file) {
      // console.log('closed output stream for',readableStream.fd);
      callback(file);

    });
    readableStream.pipe(outs);
  });
};

exports.createReadStream = function (options, callback, errCallback) {
  "use strict";

  if (!options) {
    options = {};
  }
  if (!options.root) {
    options.root = sails.config.fileRepositories.gridfs.root;
  }

  getFS((err, fs, db)=> {

    if (err) {
      errCallback(err);
      return;
    }

    var readStream = fs.createReadStream(options);

    readStream.on('error', function (err) {
      errCallback(err);
    });

    callback(readStream);

  });

};
