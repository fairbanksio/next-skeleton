var mongoose = require('mongoose');

var schema = new mongoose.Schema(
  {
    request: String,
    response: String,
    status: Number,
    timestamp: Date,
  }, {
    collection: 'skeleton',
    versionKey: false
  }
);

var skeletonSchema = mongoose.model('skeletonSchema', schema);

module.exports = skeletonSchema;
