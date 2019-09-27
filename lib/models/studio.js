const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  yearFounded: {
    type: Number,
    required: false
  },
  alive: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Studio', schema);