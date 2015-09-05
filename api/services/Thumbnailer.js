/**
 * Created by srinath on 5/9/15.
 */
let initiated = false;
let exported = {

  init(){

    //grab publisher
    var publisher = sails.hooks.publisher;

    publisher
      .queue
      .on('job complete', function (id, mapping) {

        if (mapping.successful) {
          //TODO: notify web app that thumnailing job has been process for the uploaded file
        }


      });
  },

  queue(fileName, attempt){

    if (!initiated) exported.init();
//grab publisher
    var publisher = sails.hooks.publisher;

    //publish thumbnailing work
    var job = publisher.create('thumbnailer', {
      fileName: fileName
    }).attempts(attempt || 5).backoff({delay: 3 * 1000, type: 'exponential'}).save();
  }

};
//exported.init();
export default exported;
