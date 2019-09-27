const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  pob: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Actor', schema);