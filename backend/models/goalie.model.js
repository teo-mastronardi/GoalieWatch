var mongoose = require('mongoose');

const goalieSchema = new mongoose.Schema(
  {
    username:
    {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3 
    },
    goalie_id:  
    {
      type: String,
      required: true, 
    },
    goalie_name:  
    {
      type: String,
      required: true, 
    },
    reminder:
    {
      type: Number,
      required: true,
    }
  }, {
    timestamps: true,
  });

const Goalie = mongoose.model('Goalie', goalieSchema);

module.exports = Goalie;
