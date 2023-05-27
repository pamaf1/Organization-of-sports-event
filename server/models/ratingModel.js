const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
   {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: false,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      }
   }, 
   {
    timestamps: true
   }
);

module.exports = mongoose.model('ratings', ratingSchema);