const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tacos',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)

const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
})