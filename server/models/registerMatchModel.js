const mongoose = require('mongoose');

const registeredSchema = new mongoose.Schema(
   {
    match: {
        type: mongoose.Schema.ObjectId,
        ref: "matches",
        require: true,
      },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        require: true,
    }
   }, 
   {
    timestamps: true
   }
);

module.exports = mongoose.model('registereds', registeredSchema);