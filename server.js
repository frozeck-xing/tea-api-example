require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/tea');

const app = express();

app.use(express.json());

app.use('/', routes);

app.use('/uploads', express.static('./uploads'));

mongoose.connect(
    process.env.MONGODB_URI,
    {useUnifiedTopology: true, useNewUrlParser: true},
    (err) => {
        if(err) return console.log("Error: ", err);

        console.log("MongoDB Connection -- Ready state is: ", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`App is listening on port ${listener.address().port}.`);
});