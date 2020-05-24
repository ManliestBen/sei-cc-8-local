const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const puppySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        default: "Mixed"
    },
    age: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    ownerName: {
        type: String
    } 
}, { timestamps: true }
);

module.exports = mongoose.model('Puppy', puppySchema);