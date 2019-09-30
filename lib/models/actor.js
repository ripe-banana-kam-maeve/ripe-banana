const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

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
  },
  films: [{
    type: ObjectId,
    ref: 'Films',
  }] 
});

module.exports = mongoose.model('Actor', schema);