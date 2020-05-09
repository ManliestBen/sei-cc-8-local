# node-express-weather-app
### Pre-Setup:  Sign up for a free account at [openweathermap.org](https://openweathermap.org/).  Acquire an API key.  Read the documentation, specifically how to perform a GET request.  Use Postman to test a GET request.
### <br>
### Step 1:  Create a directory to work in.
### <br>
### Step 2:  Initialize node by typing:
```js
npm init
```
### Fill out the appropriate fields.
### <br>
### Step 3:  Create your server.js and .env files:
```
touch server.js .env
```
### <br>
### Step 4:  Install the dotenv node package:
```js
npm install dotenv
```
### <br>
### Step 5:  Require the dotenv package in your server.js file:
```js
require('dotenv').config();
```
### <br>
### Step 6:  Create a .env file and put your API key inside it.
```
touch .env
```
### inside:
```
APIKEY=ds89sd89dfs98dsf90ds
```
### <br>
### Step 7:  Use npm to install the request package, then require it in server.js:
```
npm install request
```
### then:
```js
let request = require('request');
```
### <br>
### Step 8:  Define variables and set up request call:
```js 
let apiKey = process.env.APIKEY;
let city = ‘austin’;
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
request(apiUrl, function (err, response, body) {
  	if(err){
    	console.log('error:', error);
  	} else {
    	console.log('body:', body);
  	}
});
```
### <br>
### Step 9:  Run the server using 'node server' and check out the response in the console.  Let's parse the data into JSON and console.log it again:
```js
let weather = JSON.parse(body);
console.log(weather);
```
### Run the server again and check out the difference.
### <br>
### Step 10:  Define a message to display the temperature and city name using template literal notation:
```js
let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
console.log(message);
```
### Type 'node server' to check out the message.  But wait, that temperature seems off a bit.  Wrong units!  There are two ways to potentially handle this:  1.) Use math in a function to calculate the temperature in a different unit.  2.) READ THE DOCS!  There's a way to auto-convert it by simply adding the following to the query:
```
&units=imperial
```
### Try it out again
### <br>
### Step 11:  Let's install express to handle our server:
```
npm install express
```
### <br>
### Step 12:  Configure the server in server.js:
```js
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
```
### <br>
### Step 13:  Test out the server by starting it up and browsing to 'localhost:3000' and you should see the your 'Hello World' message.
### <br>
### Step 14:  Instead of sending a simple message, set up a view using ejs.  First we need to install it using npm:
```
npm install ejs
```
### ...then require it:
```js 
app.set('view engine', 'ejs');
```
### Create a directory to hold the view, then create the view.  Also, create a public directory to hold a directory named css which will hold the style.css file:
```
mkdir views public
mkdir public/css
touch views/index.ejs
touch public/css/style.css
```
### Add the following line to server.js to allow express access to the public directory:
```js 
app.use(express.static('public'));
```
### <br>
### Step 15:  Let's make an incredibly simple form with some basic CSS in index.ejs:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Express/Node Weather App</title>
    <link rel="stylesheet" type="text/css" href='../public/css/style.css'>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300' rel='stylesheet' type='text/css'>
  </head>
  <body>
    <div class="container">
      <fieldset>
        <form action="/" method="post">
          <input name="city" type="text" class="ghost-input" placeholder="Enter a City" required>
          <input type="submit" class="ghost-button" value="Check Weather">
        </form>
      </fieldset>
    </div>
  </body>
</html>
```
### <br>
### Step 16:  In order to use the body object in forms, we need middleware to parse it.  Use npm to install body-parser:
```
npm install body-parser
```
### ...require it in server.js:
```js
const bodyParser = require('body-parser');
```
### ...and add it in your middleware below:
```js
app.use(bodyParser.urlencoded({ extended: true }));
```

### <br>
### Step 17:  Next, let's handle the post request.  Add a console log to check out the body being returned when we submit a POST request::
```js
app.post('/', function (req, res) {
    console.log(req.body);
  	res.render('index');
});
```
### <br>
### Step 18:  Let's use the information inside of req.body when we call our API:

```js
app.post('/', function (req, res) {
  	let city = req.body.city;
  	let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  	request(apiUrl, function (err, response, body) {
    	if(err){
        	res.render('index', {weather: null, error: 'Please try again'});
      	} else {
        	let weather = JSON.parse(body);
        	let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      	}
    });
  	res.render('index');
});
```

### <br>
### Step 19:  Add error-handling to handle weather being 'undefined':
```js
app.post('/', function (req, res) {
  let city = req.body.city;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(apiUrl, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Please try again'});
      } else {
          let weather = JSON.parse(body);
          if (weather.main == undefined){
            res.render('index', {weather: null, error: 'Please try again'});
          } else {
              let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
              res.render('index', {weather: message, error: null});
          }
      }
  });
});
```
### <br>
### Step 20:  Update EJS to handle the data being passed, directly following the form HTML:
```html
<% if(weather !== null){ %>
    <p><%= weather %></p>
<% } %>

<% if(error !== null){ %>
    <p><%= error %></p>
<% } %>
```
### Weather is now updating when the POST request is submitted.  Hooray!  Did you notice the 'icon' being sent in the response from the API?  That icon can be used as a visual representation of the weather in the target city.  Next, we'll add that icon, as well as the current weather conditions to our view page.
### <br>
### Step 21:  Add a variable directly beneath where we parse the weather data to store the iconUrl using template literal notation:
```js
let iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
```
### <br>
### Step 22:  Add the weather conditions to the display message:
```js
let message = `It's ${weather.main.temp} degrees in ${weather.name} with ${weather.weather[0].main}.`;
```
### ...update the render function to pass in the iconUrl:
```js
res.render('index', {weather: message, iconUrl:iconUrl, error: null});
```
### ...and add a div element for the icon directly beneath the form in index.ejs:
```html
<div id="icon"><img id="wicon" src=<%=`${iconUrl}`%> alt="Weather icon"></div>
```
### ...add CSS to make the icon a little larger:
```css
#wicon {
    width: 100px;
}
```
### Everything is now functioning as intended, but needs a little organization.
### <br>
### Step 23:  Refactor the code to use routes.  Create a routes directory and add index.js inside:
```
mkdir routes
touch routes/index.js
```
### ...then move the appropriate code from server.js to index.js, renaming files as necessary:
```js
var express = require('express');
var router = express.Router();
let request = require('request');

let apiKey = process.env.APIKEY;

router.get('/', function (req, res) {
  res.render('index', {weather: null, iconUrl: ' ', error: null});
});

router.post('/', function (req, res) {
  let city = req.body.city;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(apiUrl, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Please try again'});
      } else {
          let weather = JSON.parse(body);
          let iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
          if (weather.main == undefined){
            res.render('index', {weather: null, error: 'Please try again'});
          } else {
              let message = `It's ${weather.main.temp} °F in ${weather.name} with ${weather.weather[0].main}.`;
              res.render('index', {weather: message, iconUrl:iconUrl, error: null});
          }
      }
  });
});

module.exports = router;
```
### <br>
### ...and finally, add a router to server.js so that the new route works:
```js
var indexRouter = require('./routes/index');
module.exports = app;
```


