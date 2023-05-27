const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
   {
    name: {
        type: String, 
        required: true
    },
    login: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true, 
        minlength: 3
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
      },  
    rating: {
        type: Number,
        required: false,
        default: 0,
    } 
   }, 
   {
    timestamps: true
   }
);

module.exports = mongoose.model('users', userSchema);