/**
 * Created by srinath on 27/8/15.
 */
/**
 * @description a worker to perform `thumbnailer` job type
 * @type {Object}
 */

import async from 'async';
import Thumbbot from 'Thumbbot';
import  fs from 'fs';

export default {
  //specify worker
  //job concurrency
  concurrency: 2,

  //perform sending email
  //job
  perform: function (job, done, context) {
    let mediaId = job.data.mediaId;

    async.waterfall(
      [
        function (next) {

          Media.findOne(mediaId)
            .exec((err, media) => {
              if (err) next(err);

              File.findOne({filename: media.file})
                .exec(next);
            });

        },
        //saves the media file to temp directory
        function (file, next) {
          GFS.createReadStream({
              filename: file.filename
            },
              stream => {
              var videoFilePath = './tmp/thumnails/' + file.filename;
              var writeStream = fs.createWriteStream(videoFilePath);

              // This pipes the POST data to the file
              stream.pipe(writeStream);

              writeStream.on('error', function (err) {
                next(err);
              });

              writeStream.on('end', function (err) {
                next(err, videoFilePath);
              });

            },
            next);

        },
        //creates thumnails for the saved video files
        function (videofilePath, next) {
          var video = new Thumbbot('video.mp4');
          video.seek('00:01');

          var thumbnail = yield video.save();
          if (!thumbnail) {
            //TODO: save media-thumbnail mapping info
          }

        },
        //does cleanup
        function (videoFilePath, next) {
          //TODO: delete the created video file
        }],
      (err, result)=> {


      });

    var image = new Thumbbot('image.png');

    //send email

    //update sails model
    done(null, "OK");
  }

};
