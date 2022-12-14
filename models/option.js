const mongoose = require('mongoose');

//creating "Option" Schema
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  Votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vote'
    }
  ]
  ,
  
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }
},{
  timestamps: true
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;