/**
 * Created by srinath on 27/8/15.
 */
/**
 * @description a worker to perform `thumbnailer` job type
 * @type {Object}
 */

import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import mkpath from 'mkpath';

export default {
  //specify worker
  //job concurrency
  concurrency: 2,
  //perform thumbnailing job
  perform: function (job, done, context) {
    let fileName = job.data.fileName;
    let retryCounter = job.data.retryCounter || 0;

    let _vPath = '';
    let _tPath = '';

    async.waterfall(
      [
        function (next) {

          /*Media.findOne(mediaId)
           .exec((err, media) => {
           if (err) next(err);

           File.findOne({filename: media.file})
           .exec(next);
           });*/

          let dir = path.join(process.cwd(), '/tmp/thumnails/');

          mkpath(dir, err=> next(err, dir));


        },
        //saves the media file to temp directory
        function (dir, next) {
          GFS.createReadStream({
              filename: fileName
            },
              stream => {
                var videoFilePath = path.join(dir, fileName);
              var writeStream = fs.createWriteStream(videoFilePath);

              // This pipes the POST data to the file
              stream.pipe(writeStream);

              writeStream.on('error', function (err) {
                next(err);
              });

                stream.on('end', function (err) {
                next(err, videoFilePath);
              });

            },
            next);

        },
        //creates thumnails for the saved video files
        function (videoFilePath, next) {
          try {
            _vPath = videoFilePath;


            let thumbDirName = path.dirname(videoFilePath);
            let thumbFileName = path.basename(videoFilePath, path.extname(videoFilePath)) + '.png';
            let thumbFilePath = path.join(thumbDirName, thumbFileName);

            _tPath = thumbFilePath;

            ffmpeg(videoFilePath)
              .on('error', next)
              .on('end', (result, command) => {

                GFS.saveFile({fd: thumbFileName}, thumbFilePath, uploadedFile=> {
                  next(null, uploadedFile);
                }, next);


              })
              .screenshots({
                // Will take screens at 20%, 40%, 60% and 80% of the video
                count: 1,
                filename: thumbFileName,
                folder: thumbDirName
              });


          } catch (err) {
            next(err);
          }
        },
        //does cleanup
        function (thumnailFile, next) {
          [_tPath, _vPath].forEach(filePath=> {
            try {
              fs.unlink(filePath);
            } catch (e) {
            }
          });

          Thumbnail.create({file: fileName, thumbnail: thumnailFile.filename})
            .exec(next);
        }],
      (err, result)=> {
        done(err, result);
      });
  }

};
