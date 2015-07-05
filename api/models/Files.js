/**
 * Files.js
 *
 * @description :: Data model for file meta data.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  connection: 'localMongoDbServer',
  tableName: 'files.files',
  attributes: {
    filename: {type: 'string', required: true},
    contentType: {type: 'string', defaultsTo: 'binary/octet-stream', required: true},
    length: {type: 'integer', required: true},
    chunkSize: {type: 'integer', required: true},
    uploadDate: 'datetime',
    md5: 'string',
    metadata: {
      type: 'json',
      required: true
    }
  }
};

