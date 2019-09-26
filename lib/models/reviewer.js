const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  publication: {
    type: String,
    required: true
  },
  yearsPub: {
    type: Number,
    required: true
  },
  print: {
    type: Boolean
  }
});

module.exports = mongoose.model('Reviewer', schema);