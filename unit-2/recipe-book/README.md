# Recipe Book
### The purpose of this application is to demonstrate full CRUD in a MEN-stack application, providing a step-by-step guide for those who want to code along and get some repetitions coding such applications.
### <br>
### Step 1:  Inside of the parent directory that will hold the application, run the express generator.  Be sure to use -e to indicate we'll be using ejs as the template default.
```
express -e recipe-book
```
### <br>
### Step 2:  Rename app.js --> server.js:
```
mv app.js server.js
```
### ...don't forget to adjust the www file in /bin:
```js
// var app = require('../app');
// changes to:
var app = require('../server');
```
### <br>
### Step 3:  Install and require all the packages we'll be using via npm:
```
npm i method-override dotenv mongoose axios
```
### method-override will be used for writing routes for delete/put appropriately in the controllers, dotenv will be used to safely store API keys in a .env file, mongoose will be used for interacting with the MongoDB database, and axios will be used to send requests to the Edamam API.
### <br>
### Step 4:  Create additional directories for the models, controllers, and recipe views, then create the appropriate files within them:
```
mkdir models controllers views/recipes config
touch routes/recipes.js models/recipe.js controllers/recipes.js views/recipes/index.ejs views/recipes/show.ejs views/recipes/search.ejs config/database.js
```
### <br>
### Step 5:  Require and configure method-override and dotenv in server.js:
```js
// Near the top:
var methodOverride = require('method-override');
require('dotenv').config();
// In the middleware:
app.use(methodOverride('_method'));
```
### ...then create the .env file and put each of the Edamam API keys inside to keep them secure.  With the intention of expanding the application further, store each of 3 sets of ID/Key pairs so they're all accessible without needing to visit the Edamam site to get them later:
```
touch .env
```
### 
```
RECIPE_SEARCH_ID=xxxxxxxx
RECIPE_SEARCH_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NUTRITIONAL_ANALYSIS_ID=xxxxxxxx
NUTRITIONAL_ANALYSIS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FOOD_DATABASE_ID=xxxxxxxx
FOOD_DATABASE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
### Be sure not to use any punctuation when inputting your keys, as shown above.
### Create variables in the controller for use later:
```js
const recipeSearchId = process.env.RECIPE_SEARCH_ID;
const recipeSearchKey = process.env.RECIPE_SEARCH_KEY;
const nutritionalAnalysisId = process.env.NUTRITIONAL_ANALYSIS_ID;
const nutritionalAnalysisKey = process.env.NUTRITIONAL_ANALYSIS_KEY;
const foodDatabaseId = process.env.FOOD_DATABASE_ID;
const foodDatabaseKey = process.env.FOOD_DATABASE_KEY;
```
### <br>
### Step 6:  Configure the database connection in the server and configure the connection in the database file:
### In the server file, require the database:
```js
require('./config/database');
```
### In the database file, configure the connection to your local MongoDB database:
```js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipebook',
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

var db = mongoose.connection;
 
db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
```
### <br>
### Step 7:  Define a model in models/recipe.js:
### Before defining a model, examine the data coming back in the response by using an application like Postman to make a GET request.  Searching for 'chicken' yields the following object:
```JSON
{   // This shows the query specifics, specified in the GET request:
  "q": "chicken",
  "from": 0,
  "to": 20,
  "more": true,
  "count": 168103,
  "hits": [
    // This is the start of the first recipe returned:
    {
      "recipe": {
        "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b838ad6cfd9576b30b6",
        "label": "Chicken Vesuvio",
        "image": "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
        "source": "Serious Eats",
        "url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
        "shareAs": "http://www.edamam.com/recipe/chicken-vesuvio-b79327d05b8e5b838ad6cfd9576b30b6/chicken",
        "yield": 4.0,
        "dietLabels": [
          "Low-Carb"
        ],
        "healthLabels": [
          "Sugar-Conscious",
          "Peanut-Free",
          "Tree-Nut-Free"
        ],
        "cautions": [
          "Sulfites"
        ],
        "ingredientLines": [
          "1/2 cup olive oil",
          "5 cloves garlic, peeled",
          "2 large russet potatoes, peeled and cut into chunks",
          "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
          "3/4 cup white wine",
          "3/4 cup chicken stock",
          "3 tablespoons chopped parsley",
          "1 tablespoon dried oregano",
          "Salt and pepper",
          "1 cup frozen peas, thawed"
        ],
        "ingredients": [
          {
            "text": "1/2 cup olive oil",
            "weight": 108.0
          },
          {
            "text": "5 cloves garlic, peeled",
            "weight": 15.0
          },
          {
            "text": "2 large russet potatoes, peeled and cut into chunks",
            "weight": 532.5
          },
          {
            "text": "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
            "weight": 1587.5732950000001
          },
          {
            "text": "3/4 cup white wine",
            "weight": 169.5
          },
          {
            "text": "3/4 cup chicken stock",
            "weight": 180.0
          },
          {
            "text": "3 tablespoons chopped parsley",
            "weight": 11.399999999999999
          },
          {
            "text": "1 tablespoon dried oregano",
            "weight": 5.9999999998985585
          },
          {
            "text": "Salt and pepper",
            "weight": 16.463839769999392
          },
          {
            "text": "Salt and pepper",
            "weight": 8.231919884999696
          },
          {
            "text": "1 cup frozen peas, thawed",
            "weight": 134.0
          }
        ],
        "calories": 4055.7632762010808,
        "totalWeight": 2765.5901364771207,
        "totalTime": 60.0,
        "totalNutrients": {
          "ENERC_KCAL": {
            "label": "Energy",
            "quantity": 4055.7632762010808,
            "unit": "kcal"
          },
          "FAT": {
            "label": "Fat",
            "quantity": 274.44567658260667,
            "unit": "g"
          },
          "FASAT": {
            "label": "Saturated",
            "quantity": 62.48197445465762,
            "unit": "g"
          },
          "FATRN": {
            "label": "Trans",
            "quantity": 1.047163345382,
            "unit": "g"
          },
          "FAMS": {
            "label": "Monounsaturated",
            "quantity": 147.4033339413894,
            "unit": "g"
          },
          "FAPU": {
            "label": "Polyunsaturated",
            "quantity": 47.29695541183091,
            "unit": "g"
          },
          "CHOCDF": {
            "label": "Carbs",
            "quantity": 137.1196827663874,
            "unit": "g"
          },
          "FIBTG": {
            "label": "Fiber",
            "quantity": 23.068875730861816,
            "unit": "g"
          },
          "SUGAR": {
            "label": "Sugars",
            "quantity": 15.869684287259851,
            "unit": "g"
          },
          "PROCNT": {
            "label": "Protein",
            "quantity": 225.89009682764237,
            "unit": "g"
          },
          "CHOLE": {
            "label": "Cholesterol",
            "quantity": 815.06238045,
            "unit": "mg"
          },
          "NA": {
            "label": "Sodium",
            "quantity": 6400.198183110535,
            "unit": "mg"
          },
          "CA": {
            "label": "Calcium",
            "quantity": 412.247268737062,
            "unit": "mg"
          },
          "MG": {
            "label": "Magnesium",
            "quantity": 437.2354003389978,
            "unit": "mg"
          },
          "K": {
            "label": "Potassium",
            "quantity": 5106.998207731746,
            "unit": "mg"
          },
          "FE": {
            "label": "Iron",
            "quantity": 21.373388227450473,
            "unit": "mg"
          },
          "ZN": {
            "label": "Zinc",
            "quantity": 17.809277680080992,
            "unit": "mg"
          },
          "P": {
            "label": "Phosphorus",
            "quantity": 2130.9016991001495,
            "unit": "mg"
          },
          "VITA_RAE": {
            "label": "Vitamin A",
            "quantity": 637.7520530148637,
            "unit": "µg"
          },
          "VITC": {
            "label": "Vitamin C",
            "quantity": 166.6352974495977,
            "unit": "mg"
          },
          "THIA": {
            "label": "Thiamin (B1)",
            "quantity": 1.5515793778356204,
            "unit": "mg"
          },
          "RIBF": {
            "label": "Riboflavin (B2)",
            "quantity": 1.8524542645124638,
            "unit": "mg"
          },
          "NIA": {
            "label": "Niacin (B3)",
            "quantity": 85.00298750348684,
            "unit": "mg"
          },
          "VITB6A": {
            "label": "Vitamin B6",
            "quantity": 5.937174328964289,
            "unit": "mg"
          },
          "FOLDFE": {
            "label": "Folate equivalent (total)",
            "quantity": 265.08541681620954,
            "unit": "µg"
          },
          "FOLFD": {
            "label": "Folate (food)",
            "quantity": 265.08541681620954,
            "unit": "µg"
          },
          "VITB12": {
            "label": "Vitamin B12",
            "quantity": 3.34660450586,
            "unit": "µg"
          },
          "VITD": {
            "label": "Vitamin D",
            "quantity": 107.95498406,
            "unit": "IU"
          },
          "TOCPHA": {
            "label": "Vitamin E",
            "quantity": 20.149411488585475,
            "unit": "mg"
          },
          "VITK1": {
            "label": "Vitamin K",
            "quantity": 367.74340046011383,
            "unit": "µg"
          },
          "WATER": {
            "label": "Water",
            "quantity": 1575.5855468727848,
            "unit": "g"
          }
        },
        "totalDaily": {
          "ENERC_KCAL": {
            "label": "Energy",
            "quantity": 202.78816381005404,
            "unit": "%"
          },
          "FAT": {
            "label": "Fat",
            "quantity": 422.2241178193949,
            "unit": "%"
          },
          "FASAT": {
            "label": "Saturated",
            "quantity": 312.4098722732881,
            "unit": "%"
          },
          "CHOCDF": {
            "label": "Carbs",
            "quantity": 45.706560922129135,
            "unit": "%"
          },
          "FIBTG": {
            "label": "Fiber",
            "quantity": 92.27550292344726,
            "unit": "%"
          },
          "PROCNT": {
            "label": "Protein",
            "quantity": 451.78019365528473,
            "unit": "%"
          },
          "CHOLE": {
            "label": "Cholesterol",
            "quantity": 271.68746015,
            "unit": "%"
          },
          "NA": {
            "label": "Sodium",
            "quantity": 266.67492429627225,
            "unit": "%"
          },
          "CA": {
            "label": "Calcium",
            "quantity": 41.224726873706196,
            "unit": "%"
          },
          "MG": {
            "label": "Magnesium",
            "quantity": 104.10366674738043,
            "unit": "%"
          },
          "K": {
            "label": "Potassium",
            "quantity": 108.65953633471801,
            "unit": "%"
          },
          "FE": {
            "label": "Iron",
            "quantity": 118.74104570805818,
            "unit": "%"
          },
          "ZN": {
            "label": "Zinc",
            "quantity": 161.90252436437265,
            "unit": "%"
          },
          "P": {
            "label": "Phosphorus",
            "quantity": 304.4145284428785,
            "unit": "%"
          },
          "VITA_RAE": {
            "label": "Vitamin A",
            "quantity": 70.86133922387374,
            "unit": "%"
          },
          "VITC": {
            "label": "Vitamin C",
            "quantity": 185.15033049955298,
            "unit": "%"
          },
          "THIA": {
            "label": "Thiamin (B1)",
            "quantity": 129.2982814863017,
            "unit": "%"
          },
          "RIBF": {
            "label": "Riboflavin (B2)",
            "quantity": 142.49648188557413,
            "unit": "%"
          },
          "NIA": {
            "label": "Niacin (B3)",
            "quantity": 531.2686718967927,
            "unit": "%"
          },
          "VITB6A": {
            "label": "Vitamin B6",
            "quantity": 456.7057176126376,
            "unit": "%"
          },
          "FOLDFE": {
            "label": "Folate equivalent (total)",
            "quantity": 66.27135420405239,
            "unit": "%"
          },
          "VITB12": {
            "label": "Vitamin B12",
            "quantity": 139.44185441083332,
            "unit": "%"
          },
          "VITD": {
            "label": "Vitamin D",
            "quantity": 719.6998937333334,
            "unit": "%"
          },
          "TOCPHA": {
            "label": "Vitamin E",
            "quantity": 134.32940992390317,
            "unit": "%"
          },
          "VITK1": {
            "label": "Vitamin K",
            "quantity": 306.4528337167615,
            "unit": "%"
          }
        },
        "digest": [
          {
            "label": "Fat",
            "tag": "FAT",
            "schemaOrgTag": "fatContent",
            "total": 274.44567658260667,
            "hasRDI": true,
            "daily": 422.2241178193949,
            "unit": "g",
            "sub": [
              {
                "label": "Saturated",
                "tag": "FASAT",
                "schemaOrgTag": "saturatedFatContent",
                "total": 62.48197445465762,
                "hasRDI": true,
                "daily": 312.4098722732881,
                "unit": "g"
              },
              {
                "label": "Trans",
                "tag": "FATRN",
                "schemaOrgTag": "transFatContent",
                "total": 1.047163345382,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              },
              {
                "label": "Monounsaturated",
                "tag": "FAMS",
                "schemaOrgTag": null,
                "total": 147.4033339413894,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              },
              {
                "label": "Polyunsaturated",
                "tag": "FAPU",
                "schemaOrgTag": null,
                "total": 47.29695541183091,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              }
            ]
          },
          {
            "label": "Carbs",
            "tag": "CHOCDF",
            "schemaOrgTag": "carbohydrateContent",
            "total": 137.1196827663874,
            "hasRDI": true,
            "daily": 45.706560922129135,
            "unit": "g",
            "sub": [
              {
                "label": "Carbs (net)",
                "tag": "CHOCDF.net",
                "schemaOrgTag": null,
                "total": 114.05080703552558,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              },
              {
                "label": "Fiber",
                "tag": "FIBTG",
                "schemaOrgTag": "fiberContent",
                "total": 23.068875730861816,
                "hasRDI": true,
                "daily": 92.27550292344726,
                "unit": "g"
              },
              {
                "label": "Sugars",
                "tag": "SUGAR",
                "schemaOrgTag": "sugarContent",
                "total": 15.869684287259851,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              },
              {
                "label": "Sugars, added",
                "tag": "SUGAR.added",
                "schemaOrgTag": null,
                "total": 0.0,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              }
            ]
          },
          {
            "label": "Protein",
            "tag": "PROCNT",
            "schemaOrgTag": "proteinContent",
            "total": 225.89009682764237,
            "hasRDI": true,
            "daily": 451.78019365528473,
            "unit": "g"
          },
          {
            "label": "Cholesterol",
            "tag": "CHOLE",
            "schemaOrgTag": "cholesterolContent",
            "total": 815.06238045,
            "hasRDI": true,
            "daily": 271.68746015,
            "unit": "mg"
          },
          {
            "label": "Sodium",
            "tag": "NA",
            "schemaOrgTag": "sodiumContent",
            "total": 6400.198183110535,
            "hasRDI": true,
            "daily": 266.67492429627225,
            "unit": "mg"
          },
          {
            "label": "Calcium",
            "tag": "CA",
            "schemaOrgTag": null,
            "total": 412.247268737062,
            "hasRDI": true,
            "daily": 41.224726873706196,
            "unit": "mg"
          },
          {
            "label": "Magnesium",
            "tag": "MG",
            "schemaOrgTag": null,
            "total": 437.2354003389978,
            "hasRDI": true,
            "daily": 104.10366674738043,
            "unit": "mg"
          },
          {
            "label": "Potassium",
            "tag": "K",
            "schemaOrgTag": null,
            "total": 5106.998207731746,
            "hasRDI": true,
            "daily": 108.65953633471801,
            "unit": "mg"
          },
          {
            "label": "Iron",
            "tag": "FE",
            "schemaOrgTag": null,
            "total": 21.373388227450473,
            "hasRDI": true,
            "daily": 118.74104570805818,
            "unit": "mg"
          },
          {
            "label": "Zinc",
            "tag": "ZN",
            "schemaOrgTag": null,
            "total": 17.809277680080992,
            "hasRDI": true,
            "daily": 161.90252436437265,
            "unit": "mg"
          },
          {
            "label": "Phosphorus",
            "tag": "P",
            "schemaOrgTag": null,
            "total": 2130.9016991001495,
            "hasRDI": true,
            "daily": 304.4145284428785,
            "unit": "mg"
          },
          {
            "label": "Vitamin A",
            "tag": "VITA_RAE",
            "schemaOrgTag": null,
            "total": 637.7520530148637,
            "hasRDI": true,
            "daily": 70.86133922387374,
            "unit": "µg"
          },
          {
            "label": "Vitamin C",
            "tag": "VITC",
            "schemaOrgTag": null,
            "total": 166.6352974495977,
            "hasRDI": true,
            "daily": 185.15033049955298,
            "unit": "mg"
          },
          {
            "label": "Thiamin (B1)",
            "tag": "THIA",
            "schemaOrgTag": null,
            "total": 1.5515793778356204,
            "hasRDI": true,
            "daily": 129.2982814863017,
            "unit": "mg"
          },
          {
            "label": "Riboflavin (B2)",
            "tag": "RIBF",
            "schemaOrgTag": null,
            "total": 1.8524542645124638,
            "hasRDI": true,
            "daily": 142.49648188557413,
            "unit": "mg"
          },
          {
            "label": "Niacin (B3)",
            "tag": "NIA",
            "schemaOrgTag": null,
            "total": 85.00298750348684,
            "hasRDI": true,
            "daily": 531.2686718967927,
            "unit": "mg"
          },
          {
            "label": "Vitamin B6",
            "tag": "VITB6A",
            "schemaOrgTag": null,
            "total": 5.937174328964289,
            "hasRDI": true,
            "daily": 456.7057176126376,
            "unit": "mg"
          },
          {
            "label": "Folate equivalent (total)",
            "tag": "FOLDFE",
            "schemaOrgTag": null,
            "total": 265.08541681620954,
            "hasRDI": true,
            "daily": 66.27135420405239,
            "unit": "µg"
          },
          {
            "label": "Folate (food)",
            "tag": "FOLFD",
            "schemaOrgTag": null,
            "total": 265.08541681620954,
            "hasRDI": false,
            "daily": 0.0,
            "unit": "µg"
          },
          {
            "label": "Folic acid",
            "tag": "FOLAC",
            "schemaOrgTag": null,
            "total": 0.0,
            "hasRDI": false,
            "daily": 0.0,
            "unit": "µg"
          },
          {
            "label": "Vitamin B12",
            "tag": "VITB12",
            "schemaOrgTag": null,
            "total": 3.34660450586,
            "hasRDI": true,
            "daily": 139.44185441083332,
            "unit": "µg"
          },
          {
            "label": "Vitamin D",
            "tag": "VITD",
            "schemaOrgTag": null,
            "total": 107.95498406,
            "hasRDI": true,
            "daily": 719.6998937333334,
            "unit": "µg"
          },
          {
            "label": "Vitamin E",
            "tag": "TOCPHA",
            "schemaOrgTag": null,
            "total": 20.149411488585475,
            "hasRDI": true,
            "daily": 134.32940992390317,
            "unit": "mg"
          },
          {
            "label": "Vitamin K",
            "tag": "VITK1",
            "schemaOrgTag": null,
            "total": 367.74340046011383,
            "hasRDI": true,
            "daily": 306.4528337167615,
            "unit": "µg"
          },
          {
            "label": "Sugar alcohols",
            "tag": "Sugar.alcohol",
            "schemaOrgTag": null,
            "total": 0.0,
            "hasRDI": false,
            "daily": 0.0,
            "unit": "g"
          },
          {
            "label": "Water",
            "tag": "WATER",
            "schemaOrgTag": null,
            "total": 1575.5855468727848,
            "hasRDI": false,
            "daily": 0.0,
            "unit": "g"
          }
        ]
      },
      "bookmarked": false,
      "bought": false
    }
    ...
    ...
    ...

```
### Phew... That was just ONE of the JSON objects returned.  Set up the model to store only the data by recipe name.  Save all the data received from the API for later potential manipulation/display.  In models/recipe.js:
```js
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
```
### <br>
### Step 8:  Configure the router/route to handle a GET request for 'recipes/search' that will render views/recipes/search.ejs:
### Configure the router in the server:
```js
// Near the top
const recipesRouter = require('./routes/recipes');
// At the bottom of middleware:
app.use('/recipes/', recipesRouter);
```
### ...then add the code for the router in routes/recipes.js:
```js
var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');

router.get('/search', recipesCtrl.search);

module.exports = router;
```
### ...while adding the route, change the route inside index.js so that the landing page redirects to the search page:
```js
router.get('/', function(req, res, next) {
  res.redirect('/recipes/search')
});
```
### ...then code the controller (controllers/recipes.js):
```js
var Recipe = require('../models/recipe');

module.exports = {
    search,
}

function search(req, res) {
    res.render('recipes/search');
}
```
### ...then create a simple form to use for a search in search.ejs:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <title>Document</title>
</head>
<nav>
    <div class="nav-wrapper">
      <a class="left brand-logo">Recipe Book</a>
      <ul id="nav-mobile" class="right ">
        <li><a href="/recipes/search">Add Recipe</a></li>
        <li><a href="/recipes/">All Recipes</a></li>
      </ul>
    </div>
</nav>
<body>
    <h3>Recipe Search</h3>
    <form action="/recipes/search/" method="POST">
        <input type="text" name="query">
        <button onclick="this.classList.toggle('yellow')" class="btn waves-effect waves-light" type="submit" name="action">Search Edamam</button>
    </form>
    
</body>
</html>
```
### <br>
### Step 9:  Next, write the route specified in the search form:
```js
router.post('/search', recipesCtrl.apiCall);
```
### ...then write the controller using the axios module.  Don't forget to require axios at the top of the controller:
```js
const axios = require('axios');
.
.
.
// Don't forget to add apiCall to module.exports!:
module.exports = {
    search,
    apiCall
}
.
.
.
function apiCall(req, res) {
    let query = req.body.query;
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=${recipeSearchId}&app_key=${recipeSearchKey}&from=0&to=10`)
        .then(response => {
            let searchResults = response.data.hits;
            res.render('recipes/searchresults', {recipes: searchResults})
        })
        .catch(error => {
            console.log(error);
        });
}
```
### ...notice how the response renders searchresults.  Create that file, then add some basic HTML and ejs to display the results:
```
touch views/recipes/searchresults.ejs
```
### 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <title>Document</title>
</head>
<nav>
    <div class="nav-wrapper">
      <a class="left brand-logo">Recipe Book</a>
      <ul id="nav-mobile" class="right ">
        <li><a href="/recipes/search">Add Recipe</a></li>
        <li><a href="/recipes/">All Recipes</a></li>
      </ul>
    </div>
</nav>
<body>
    <% if (!recipes) { %>
    <<h3>Recipe Search</h3>
    <form action="/recipes/search/" method="POST">
        <input type="text" name="query">
        <button class="btn waves-effect waves-light" type="submit" name="action">Search Edamam</button>
    </form>
    <% } %>
    <% if (recipes) { %>
        <a class="waves-effect waves-light btn" href="/recipes/search">Back to Search</a> 
        <h2>Search Results:</h2><br><br>
        <% recipes.forEach(function(r) { %>
            <div class="row">
                <div class="col s12 m7">
                <div class="card large">
                    <div class="card-image">
                    <img src="<%= r.recipe.image %>">
                    </div>
                    <div class="card-content">
                    <span class="card-title"><%= r.recipe.label %></span>
                    <p>Yield: <%= r.recipe.yield %> servings</p><br>
                    <% r.recipe.calories = Math.floor(r.recipe.calories) %>
                    <p><%= r.recipe.calories %> Calories per serving</p>
                    </div>
                    <div class="card-action">
                        <a class="teal-text" target="_blank" href="<%= r.recipe.url %>">Recipe from <%= r.recipe.source %></a><br><br>
                        <form action="/recipes/add" method="POST">
                            <% var edamam_id = r.recipe.uri.replace("http://www.edamam.com/ontologies/edamam.owl#recipe_","") %>
                            <input type="text" hidden name="edamam_id" value="<%= edamam_id %>">
                            <button class="btn waves-effect waves-light" type="submit">Add to Recipe Book</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            
        <% }) %>
    <% } %>
</body>
</html>
```


### <br>
### Step 10:  Define a route to handle adding a recipe to the database:
```js
router.post('/add', recipesCtrl.addRecipe);
```
### ...then write the controller for it:
```js
function addRecipe(req, res) {
    let edamam_id = req.body.edamam_id;
    axios.get(`https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${edamam_id}&app_id=${recipeSearchId}&app_key=${recipeSearchKey}`)
    .then(response => {
        req.body.recipeDetails = response.data[0];
        req.body.recipeName = response.data[0].label;
        response.data[0].totalNutrients.SUGAR_added = response.data[0].totalNutrients['SUGAR.added'];
        delete response.data[0].totalNutrients['SUGAR.added'];
        var recipe = new Recipe(req.body);
        recipe.save(function(err) {
            if (err) return console.log(err);
        })
        console.log('Added recipe to database: ' + recipe);
        res.redirect('/recipes/search')
    })
    .catch(error => {
        console.log(error);
    });
}
```
### <br>
### Step 11:  Next, write a route to view all the saved recipes:
```js
router.get('/', recipesCtrl.index);
```
### ...then write the controller:
```js
function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/index', {recipes: recipes});
        }
    });
}
```
### ...then write the index view:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <title>Document</title>
</head>
<nav>
    <div class="nav-wrapper">
      <a class="left brand-logo">Recipe Book</a>
      <ul id="nav-mobile" class="right ">
        <li><a href="/recipes/search">Add Recipe</a></li>
        <li><a href="/recipes/">All Recipes</a></li>
      </ul>
    </div>
</nav>
<body>
    <h2>Favorite Recipes</h2>
    <div class="collection">
        <% recipes.forEach(function(r) { %>
            <a href="/recipes/show/<%= r._id %>" class="collection-item"><%= r.recipeDetails.label %></a><br>
        <% }) %>
    </div>
</body>
</html>
```
### <br>
### Step 12:  Next, write a route to handle the id being passed to recipes/show/:
```js
router.get('/show/:id', recipesCtrl.showRecipe);
```
### ...then write the controller:
```js
function showRecipe(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/show', {recipe: recipe})
        }
    });
}
```
### ...then write a view:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <title>Document</title>
</head>
<nav>
    <div class="nav-wrapper">
      <a class="left brand-logo">Recipe Book</a>
      <ul id="nav-mobile" class="right ">
        <li><a href="/recipes/search">Add Recipe</a></li>
        <li><a href="/recipes/">All Recipes</a></li>
      </ul>
    </div>
</nav>
<body><% console.dir(recipe) %>
    <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img src="<%= recipe.recipeDetails.image %>">
            </div>
            <span class="card-title"><%= recipe.recipeDetails.label %></span>
            <div class="card-content">
                <p class="text-bold">Yield: <%= recipe.recipeDetails.yield %> servings </p><br>
                <p>Calories: <%= Math.floor(recipe.recipeDetails.calories) %> per serving</p><br>
                <p>Ingredients: 
                    <% recipe.recipeDetails.ingredientLines.forEach(function(i) { %>
                        <li>
                            <%= i %>
                        </li>
                    <% }); %>
                </p>
            </div>
            <div class="card-action">
              <a class="teal-text" href="<%= recipe.recipeDetails.url %>">Recipe from <%= recipe.recipeDetails.source %></a>
            </div>
          </div>
        </div>
      </div>
</body>
</html>
```
### ...toss in a different color for the nav-bar:
```css
nav {
  background-color: cornflowerblue;
}
```
### <br>
### Step 13:  Too many view pages are repeating HTML code.  Refactor using partial views to keep things DRY:
```
mkdir views/partials
touch views/partials/base.ejs
```
### ...take the repetitious code and put it inside base.ejs:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <title>Document</title>
</head>
<nav>
    <div class="nav-wrapper">
      <a class="left brand-logo">Recipe Book</a>
      <ul id="nav-mobile" class="right ">
        <li><a href="/recipes/search">Add Recipe</a></li>
        <li><a href="/recipes/">All Recipes</a></li>
      </ul>
    </div>
</nav>
```
### ...replacing it with a link in each view:
```js
<%- include('../partials/base') %>
```
### <br>
### Step 14:  Next, set up a link for a 'Shopping List' in the nav bar:
```html
<li><a href="/recipes/shoppinglist">Shopping List</a></li>
```
### ...then add the route:
```js
router.get('/shoppinglist', recipesCtrl.shoppingList);
```
### ...then add the controller:
```js
function shoppingList(req, res) {
    ShoppingList.find({}, function(err, listItems) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/shoppinglist', {listItems: listItems});
        }
    });
}
```
### ...don't forget to include the model at the top of the controller:
```js
var ShoppingList = require('../models/shoppinglist');
```
### ...next, create the model:
```
touch models/shoppinglist.js
```
### ...and code it out:
```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let shoppingListSchema = new Schema({
    listItems: [],
},  {
    timestamps: true
    }
);

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
```
### Step 15:  Code a form/button on the show view to handle adding the ingredients to the newly created model:
```js
<form action="/recipes/shoppinglist" method="POST">
    <input type="text" name="listItems" hidden value="<%= recipe.recipeDetails.ingredientLines.toString() %>">
    <button class="btn waves-effect waves-light btn-small right" type="submit">Add to Shopping List</button>
</form>
```
### ...then write the route:
```js
router.post('/shoppinglist', recipesCtrl.addToShoppingList);
```
### ...then write the controller:
```js
function addToShoppingList(req, res) {
    req.body.listItems = req.body.listItems.split(',');
    ShoppingList.find({}, function(err, listItems) {
        if (err) {
            console.log(err);
        } else if (!listItems.length) {
            let shoppingList = new ShoppingList(req.body)
            shoppingList.save(function(err) {
                console.log('Created new list: ' + shoppingList);
                res.redirect('/recipes/shoppingList');
            });
        } else {
            req.body.listItems.forEach(function(i) {
                listItems[0].listItems.push(i);
            })
            listItems[0].save(function(err) {
                console.log('Added items to list');
            });
            res.redirect('/recipes/shoppinglist')
        }
    });
}
```

### Step 16:  Create and add the view for the shopping list page:
```
touch views/recipes/shoppinglist.ejs
```
```html
<%- include('../partials/base') %>
    <body>
        <div class="collection">
            <a href="/recipes/shoppinglist/deletemode" class="red right waves-effect waves-light btn-small">Remove Items</a>
                <% listItems[0].listItems.forEach(function(i, idx) { %>
                    <p>
                        <label>
                          <input type="checkbox" />
                          <span><%= i %></span>
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                <% }) %>
            </div>
    </body>
</html>
```
### <br>
### Step 17:  Notice the <a> route to delete-mode.  Next, we'll code a 'delete' mode view of the shopping list page.  Start with the route:
```js
router.get('/shoppinglist/deletemode', recipesCtrl.listDeleteMode);
```
### ...then the controller:
```js
function listDeleteMode(req, res) {
    ShoppingList.find({}, function(err, listItems) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/shoppinglistdelete', {listItems: listItems});
        }
    });
}
```
### ...then create and write the view:
```
touch views/recipes/shoppinglistdelete.ejs
```
```html
<%- include('../partials/base') %>
    <body>
        <div class="collection">
            <a href="/recipes/shoppinglist" class="red right waves-effect waves-light btn-small">Done</a>
                <% listItems[0].listItems.forEach(function(i, idx) { %>
                    <p>
                        <form action="/recipes/shoppinglist/<%= idx %>?_method=DELETE" method="POST">
                        <label>
                          <input type="checkbox" />
                          <span><%= i %></span>
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button class="red btn-small waves-effect waves-light" type="submit">X</button>
                        </form>
                    </p>
                <% }) %>
            </div>
    </body>
</html>
```
### <br>
### Step 18:  Next, code the functionality to delete an item from the shopping list while in delete mode.  Start with the route:
```js
router.delete('/shoppinglist/delete/:id', recipesCtrl.deleteShoppingItem);
```
### ...then the controller:
```js
function deleteShoppingItem(req, res) {
    ShoppingList.find({}, function(err, listItems) {
        if (err) {
            console.log(err);
        } else {
            listItems[0].listItems.splice(req.params.id , 1);
            listItems[0].save(function(err) {
                console.log('Removed item from the list')
            })
            res.render('recipes/shoppinglistdelete', {listItems: listItems});
        }
    });
}
```
### <br>
### Step 19:  Add delete functionality for recipes using the same methodology.  First, add a button to the index view:
```html
<a href="/recipes/deletemode" class="red right waves-effect waves-light btn-small">Remove Recipes</a><br><br>
```
### ...then add the corresponding route:
```js
router.get('/deletemode', recipesCtrl.indexDeleteMode);
```
### ...then write the controller:
```js
function indexDeleteMode(req, res) {
    Recipe.find({}, function(err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/indexdelete', {recipes: recipes});
        }
    });
}
```
### ...then create and add the view:
```
touch views/recipes/indexdelete.ejs
```
```html
<%- include('../partials/base') %>
<body>
    <h2>Favorite Recipes</h2>
    <a href="/recipes/" class="red right waves-effect waves-light btn-small">Done</a><br><br>
    <div class="collection">
        <% recipes.forEach(function(r) { %>
            <form action="/recipes/<%= r._id %>?_method=DELETE" method="POST"><button class="red btn waves-effect waves-light right" type="submit">X</button></form>
            <a href="/recipes/show/<%= r._id %>" class="collection-item"><%= r.recipeDetails.label %></a><br>
            <% }) %>
    </div>
</body>
</html>
```
### ...then write the route for the delete button:
```js
router.delete('/:id', recipesCtrl.deleteRecipe);
```
### ...then write the controller:
```js
function deleteRecipe(req, res) {
    Recipe.findByIdAndDelete(req.params.id, function(err, recipe){
        if (err) {
            console.log(err);
        } else {
        console.log('deleting: ' + recipe);
        res.redirect('/recipes/deletemode')
        }
    })
}
```
### Step 20:

