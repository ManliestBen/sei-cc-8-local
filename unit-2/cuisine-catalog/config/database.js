var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cuisine',
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

var db = mongoose.connection;
 
db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});