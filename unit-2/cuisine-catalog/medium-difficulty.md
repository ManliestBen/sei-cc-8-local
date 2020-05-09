# Step-By-Step Instructions (with some code):
## <br>
### Step 1:  Navigate to the parent directory where you want to create your app.  Use the express generator to create your app's skeleton:
```
express -e cuisine-catalog
```
### <br>
### Step 2: Navigate into the directory and open in VS Code.

### <br>
### Step 3:  Open a terminal in VS Code.  Change the name of app.js to server.js.
### <br>
### Step 4:  Adjust the /bin/www file to reflect those changes so that your server will start properly:
```js
// Change var app = require('../app'); to:
var app = require('../server');
```
### <br>
### Step 5:  Create directories for the model, controller, database (config), and views, then add the corresponding files within each.  (views/cuisine models/cuisine.js controllers/cuisine.js config/database.js)

### <br>
### Step 6:  Install node modlues and mongoose using npm:
```
npm install
npm install mongoose
```
### <br>
### Step 7:  Split the terminal at the bottom of VS Code to open a second window for monitoring the server.  Start the server using nodemon and test it out.

### When you browse to 'localhost:3000' you should see the generic express template.
## <br>
### Step 8:  Configure the database connection in database.js:
```js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cuisine',
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

var db = mongoose.connection;
 
db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
```
### <br>
### Step 9:  Require the database in the server:
```js
require('./config/database');
```
### <br>
### Step 10:  Define the schema in the model:
```js
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
```
### <br>
### Step 11:  Use the terminal to rename users.js --> cuisine.js.
### <br>
### Step 12:  Adjust the server to reflect the changes from the previous step:
```js
// Change var userRouter = require('./routes/user'); to:
var cuisineRouter = require('./routes/cuisine');
// Change app.use('/user', userRouter); to:
app.use('/cuisine', cuisineRouter);
```
### <br>
### Step 13:  Configure your router and define a route to create a new cuisine:
```js
var express = require('express');
var router = express.Router();
var cuisineCtrl = require('../controllers/cuisine');

router.get('/new', cuisineCtrl.new);

module.exports = router;
```
### <br>
### Step 14:  Add the controller:
```js
var Cuisine = require('../models/cuisine');

module.exports = {
    new: newCuisine
}

function newCuisine(req, res) {
    res.render('cuisine/new');
}
```
### <br>
### Step 15:  Create a 'new' view page.
### <br>
### Step 16:  Create a form within the 'new' view for the user to add an item:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Add Cuisine</title>
</head>
<body>
    <h2>Enter new cuisine:</h2><br>
    <form action="/cuisine" method="POST">
        <label>Recipe Name:
            <input type="text" name="title">
        </label><br><br>
        <label>Meal Type (select one):
            <select name="mealType">
                <option value="Snack">Snack</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
            </select>
        </label><br><br>
        <label>Calories (per serving):
            <input type="text" name="calories">
        </label><br><br>
        <label>Ingredients (separate each with a comma):
            <textarea id="ingredientBox" rows="1" type="text" name="ingredients"></textarea>
            </label><br><br>
        <label>Link to recipe:
            <input id="urlInput" type="text" name="recipeUrl">
        </label><br><br>

        <button type="submit" class="btn btn-success">Add</button>
    </form>
</body>
</html>
```
### <br>
### Step 17:  Add minimal CSS in public/stylesheets/style.css:
```css
#ingredientBox {
  width: 250px;
}

#ingredientBox:focus {
  height: 100px;
}

#urlInput {
  width: 430px;
}
```
### <br>
### Step 18:  Define the POST route:
```js
router.post('/', cuisineCtrl.create);
```
### <br>
### Step 19:  Create a controller for the route:
```js
module.exports = {
    new: newCuisine,
    create
}
...
...
...

function create(req, res) {
    req.body.ingredients = req.body.ingredients.replace(/\s*,\s*/g, ',');
    if (req.body.ingredients) req.body.ingredients = req.body.ingredients.split(',');
    var cuisine = new Cuisine(req.body);
    cuisine.save(function(err) {
        if (err) return res.render('cuisine/new');
        console.log('Added cuisine to database: ' + cuisine);
        res.redirect('/cuisine');
    });
}
```
### Step 20:  Navigate to 'localhost:3000/new' in your browser.  Fill out the fields and hit the 'Add' button.  Check to make sure the POST request shows up in the terminal currently running the server:
![new-post](public/images/new-post.png)
### <br>
### Step 21:  Define a route for the index page.
```js
router.get('/', cuisineCtrl.index);
```
### <br>
### Step 22:  Add the corresponding controller.
```js
function index(req, res) {
    Cuisine.find({}, function(err, cuisine) {
        if (err) {
            console.log(err);
        } else {
        res.render('cuisine/index', {title: 'Cuisine List', cuisine});
        }
    });
}
```
### <br>
### Step 23:  Use the terminal to create an 'index' view.
### <br>
### Step 24:  Add a button to add, along with a simple table using ejs in the newly created index.ejs:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Cuisine List</title>
</head>
<body>
    <h2>Cuisine List</h2><br>
    <table id="cuisineList">
        <thead>
            <tr>
                <th>Recipe</th>
                <th>Meal<br>Type</th>
                <th>Recipe<br>URL</th>
            </tr>
        </thead>
        <tbody>
            <% cuisine.forEach(function(c) { %>
                <tr>
                    <td><%= c.title %></td>
                    <td><%= c.mealType %></td>
                    <td><a href="http://<%= c.recipeUrl %>">See Recipe</a></td>
                    <td><a href="/cuisine/<%= c._id %>">Details</a></td>
                </tr>
            <% }) %>
        </tbody>
    </table>
    <a href="/cuisine/new">Add Cuisine</a>
</body>
</html>
```
### <br>
### Step 25:  Add some CSS to make it look a little nicer:
```css
table thead th {
  padding: 5px;
  border-bottom: 2px solid #424748;
}

table td {
  padding: 10px;
  text-align: center;
}

#cuisineList td:nth-child(2), #cuisineList td:nth-child(3){
  min-width: 100px;
}
```
### <br>
### Step 26:  Change the default 'localhost:3000' landing page to redirect to 'localhost:3000/cuisine' now that it is properly displaying all items.  Do this by changing the route.
```js
router.get('/', function(req, res, next) {
  res.redirect('cuisine/')
  
});
```
### <br>
### Step 27:  Add a route for the 'Details' button that was just created.
```js
router.get('/:id', cuisineCtrl.show);
```
### <br>
### Step 28:  Add the controller for the new route.
```js
function show(req, res) {
    Cuisine.findById(req.params.id, function(err, cuisine){
        if (err) {
            console.log(err);
        } else {
        res.render('cuisine/show', {title: 'Cuisine Details', cuisine});
        }
    });
}
```
### <br>
### Step 29:  Using the terminal, create a 'show' view page.
### <br>
### Step 30:  Write the HTML/ejs to display the data for an individual item in the show view:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Cuisine Details</title>
</head>
<body>
    <h2>Cuisine Details</h2><br>
    <div class="details-bold">Recipe Name:</div>
    <div><%= cuisine.title %></div>
    <div class="details-bold">Meal Type:</div>
    <div><%= cuisine.mealType %></div>
    <div class="details-bold">Calories:</div>
    <div><%= cuisine.calories %></div>
    <div class="details-bold">Ingredients:</div>
    <%= cuisine.ingredients.map(i => i).join(', ') %>
    <div class="details-bold">Recipe Link:</div>
    <div><%= cuisine.recipeUrl %></div>
</body>
</html>
```
### <br>
### Step 31:  Add some CSS to clean up the display:
```css
.details-bold {
  font-weight: bold;
  text-decoration: underline;
}
```
### <br>
### Step 31.5: Use npm to install the method-override package:
```
npm i method-override
```
### ...then require it in server.js:
```js
let methodOverride = require('method-override);
```
### ...and add it to the middleware:
```js
app.use(methodOverride('_method'));
```
### <br>
### Step 32:  Add a button to handle deletion:
```html
<tr>
    <td><%= c.title %></td>
    <td><%= c.mealType %></td>
    <td><a href="http://<%= c.recipeUrl %>">See Recipe</a></td>
    <td><a href="/cuisine/<%= c._id %>">Details</a></td>
    <!-- Add the following form here: -->
    <form action="/cuisine/<%= c._id %>?_method=DELETE" method="POST">
    <td><button type="submit" class="btn btn-danger">X</button></td>
    </form>
</tr>
```
### <br>
### Step 33:  Add the route to handle deletions.
```js
router.delete('/:id', cuisineCtrl.delete);
```
### <br>
### Step 34:  Add the corresponding controller.
```js
function deleteOne(req, res) {
    Cuisine.findByIdAndDelete(req.params.id, function(err, cuisine){
        if (err) {
            console.log(err);
        } else {
        console.log('deleting: ' + cuisine);
        }
    })
    res.render('/cuisine')
}
```
### <br>
### Step 35:  Add a button to handle updating an item:
```html
<!-- ... -->
<div class="details-bold">Recipe Link:</div>
    <div><%= cuisine.recipeUrl %></div>
    <!-- Add the button here: -->
    <form action="/cuisine/update/<%= cuisine._id %>?_method=PUT">
        <button type="submit" class="btn btn-warning">Edit</button>
    </form>
</body>
```
### <br>
### Step 36:  Add the route to handle showing the update page.
```js
router.put('/update/:id', cuisineCtrl.showUpdate);
```
### <br>
### Step 37:  Add the corresponding controller.
```js
function showUpdate(req, res) {
    Cuisine.findById(req.params.id, function(err, cuisine) {
        if (err) {
            console.log(err);
        } else {
        res.render('cuisine/update', {title: 'Update Cuisine', cuisine});
        }
    });
    
}
```
### <br>
### Step 38:  Using the terminal, create an 'update' view.
### <br>
### Step 39:  Copy the form over from show.ejs to update.ejs, but modify it to auto-populate the values of each field with the current record's info:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Add Cuisine</title>
</head>
<body>
    <h2>Update cuisine:</h2><br>
    <form action="/cuisine/update/<%= cuisine._id %>" method="POST">
        <label>Recipe Name:
            <input type="text" name="title" value="<%= cuisine.title %>">
        </label><br><br>
        <label>Meal Type (select one):
            <select name="mealType">
                <option selected ><%= cuisine.mealType %></option>
                <option value="Snack">Snack</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
            </select>
        </label><br><br>
        <label>Calories (per serving):
            <input type="text" name="calories" value="<%= cuisine.calories %>">
        </label><br><br>
        <label>Ingredients (separate each with a comma):
            <textarea id="ingredientBox" rows="1" type="text" name="ingredients"><%= cuisine.ingredients.map(i => i).join(', ') %></textarea>
            </label><br><br>
        <label>Link to recipe:
            <input id="urlInput" type="text" name="recipeUrl" value="<%= cuisine.recipeUrl %>">
        </label><br><br>

        <button type="submit" class="btn btn-success">Update</button>
    </form>
</body>
</html>
```
### <br>
### Step 40:  Add the POST route to send the record to be updated.
```js
router.post('/update/:id', cuisineCtrl.update);
```
### <br>
### Step 41:  Add the corresponding controller.
```js
function update(req, res) {
    console.log(req.body);
    req.body.ingredients = req.body.ingredients.replace(/\s*,\s*/g, ',');
    if (req.body.ingredients) req.body.ingredients = req.body.ingredients.split(',');
    Cuisine.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            calories: req.body.calories,
            mealType: req.body.mealType,
            recipeUrl: req.body.recipeUrl,
            ingredients: req.body.ingredients
        },
        {new: true},
        function(err, response) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/cuisine')
            }
        })
}
```
### <br>
### Step 42:  Profit.
