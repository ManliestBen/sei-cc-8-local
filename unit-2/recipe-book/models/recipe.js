const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let recipeSchema = new Schema({
    recipeName: {type: String, required: true},
    personalRating: {type: Number, min:1, max:10},
    comments: {type: String},
    recipeDetails: Schema.Types.Mixed
},  {
    timestamps: true
    }
);


module.exports = mongoose.model('Recipe', recipeSchema);