const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let shoppingListSchema = new Schema({
    listItems: [],
},  {
    timestamps: true
    }
);

module.exports = mongoose.model('ShoppingList', shoppingListSchema);