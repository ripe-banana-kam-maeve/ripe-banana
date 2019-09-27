const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  yearPub: {
    type: Number,
    required: true
  },
  digital: {
    type: Boolean
  },
  actors: [{
    actor: {
      type: ObjectId,
      ref: 'Actor',
      required: true
    }
  }],
  studio: {
    type: ObjectId,
    ref: 'Studio',
    required: true
  }
});

module.exports = mongoose.model('Film', schema);