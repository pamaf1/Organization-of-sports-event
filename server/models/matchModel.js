const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
   {
    place: {
        type: String, 
        required: true
    },
    partisipants: {
        type: Number, 
        required: true
    },
    contacts: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    }, 
    description: {
        type: String, 
        required: false
    },
    registeredUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
        required: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
   }, 
   {
    timestamps: true
   }
);

module.exports = mongoose.model('matches', matchSchema);