/**
 * FilesChunks.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    files_id: {type: 'string', required: true},
    data: {type: 'array', required: true}
  }
};

