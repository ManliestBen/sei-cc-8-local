# Step-By-Step Instructions (with no code):
## <br>
### Step 1:  Navigate to the parent directory where you want to create your app.  Use the express generator to create your app's skeleton.
### <br>
### Step 2: Navigate into the directory and open in VS Code.

### <br>
### Step 3:  Open a terminal in VS Code.  Change the name of app.js to server.js.
### <br>
### Step 4:  Adjust the /bin/www file to reflect those changes so that your server will start properly.

### <br>
### Step 5:  Create directories for the model, controller, database (config), and views, then add the corresponding files within each.  (views/cuisine models/cuisine.js controllers/cuisine.js config/database.js)

### <br>
### Step 6:  Install node modlues and mongoose using npm.

### <br>
### Step 7:  Split the terminal at the bottom of VS Code to open a second window for monitoring the server.  Start the server using nodemon and test it out.

### When you browse to 'localhost:3000' you should see the generic express template.
## <br>
### Step 8:  Configure the database connection in database.

### <br>
### Step 9:  Require the database in the server.

### <br>
### Step 10:  Define the schema in the model.

### <br>
### Step 11:  Use the terminal to rename users.js --> cuisine.js.
### <br>
### Step 12:  Adjust the server to reflect the changes from the previous step.

### <br>
### Step 13:  Configure your router and define a route to create a new cuisine.

### <br>
### Step 14:  Add the controller.

### <br>
### Step 15:  Create a 'new' view page.
### <br>
### Step 16:  Create a form within the 'new' view for the user to add an item.

### <br>
### Step 17:  Add minimal CSS in public/stylesheets/style.css.

### <br>
### Step 18:  Define the POST route.

### <br>
### Step 19:  Create a controller for the route.

### Step 20:  Navigate to 'localhost:3000/new' in your browser.  Fill out the fields and hit the 'Add' button.  Check to make sure the POST request shows up in the terminal currently running the server:
![new-post](public/images/new-post.png)
### <br>
### Step 21:  Define a route for the index page.

### <br>
### Step 22:  Add the corresponding controller.

### <br>
### Step 23:  Use the terminal to create an 'index' view.
### <br>
### Step 24:  Add a button to add, along with a simple table using ejs in the newly created index.ejs:

### <br>
### Step 25:  Add some CSS to make it look a little nicer.

### <br>
### Step 26:  Change the default 'localhost:3000' landing page to redirect to 'localhost:3000/cuisine' now that it is properly displaying all items.  Do this by changing the route.

### <br>
### Step 27:  Add a route for the 'Details' button that was just created.

### <br>
### Step 28:  Add the controller for the new route.

### <br>
### Step 29:  Using the terminal, create a 'show' view page.
### <br>
### Step 30:  Write the HTML/ejs to display the data for an individual item in the show view.

### <br>
### Step 31:  Add some CSS to clean up the display.
### <br>

### Step 31.5:  Use npm to install the method-override package:
### ...then require it in server.js:
### ...and add it to the middleware:
### <br>

### Step 32:  Add a button to handle deletion.

### <br>
### Step 33:  Add the route to handle deletions.

### <br>
### Step 34:  Add the corresponding controller.

### <br>
### Step 35:  Add a button to handle updating an item.

### <br>
### Step 36:  Add the route to handle showing the update page.

### <br>
### Step 37:  Add the corresponding controller.

### <br>
### Step 38:  Using the terminal, create an 'update' view.
### <br>
### Step 39:  Copy the form over from show.ejs to update.ejs, but modify it to auto-populate the values of each field with the current record's info.

### <br>
### Step 40:  Add the POST route to send the record to be updated.

### <br>
### Step 41:  Add the corresponding controller.

### <br>
### Step 42:  Profit.
