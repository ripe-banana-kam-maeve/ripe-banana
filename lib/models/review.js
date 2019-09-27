const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  reviewer: {
    type: ObjectId,
    required: true
  },
  review: {
    type: String,
    required: true,
    maxLength: 1000
  },
  film: {
    type: ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Review', schema);
  