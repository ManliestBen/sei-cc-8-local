var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cuisineSchema = new Schema({
    title: {type: String, required: true},
    calories: {type: Number},
    mealType: {type: String, enum: ['Snack', 'Breakfast', 'Lunch', 'Dinner', 'Dessert']},
    recipeUrl: {type: String},
    ingredients: [String]
}, {
    timestamps: true
   }
);

module.exports = mongoose.model('Cuisine', cuisineSchema);