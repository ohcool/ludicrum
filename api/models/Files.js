/**
 * Files.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
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

