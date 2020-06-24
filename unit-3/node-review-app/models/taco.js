const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tacoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [String],
    tasty: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Taco', tacoSchema);