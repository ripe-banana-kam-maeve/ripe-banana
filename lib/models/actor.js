const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthYear: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('Actor', schema);