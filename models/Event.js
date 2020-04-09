const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  imageName: {
    type: String
  },
  description: {
    type: String
  },
  postedDate : {
    type: Date,
    default: Date.now()
  }
});


const Event = mongoose.model('events', EventSchema);

module.exports = Event;
