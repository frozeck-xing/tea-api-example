require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes/tea');

const app = express();

app.use(express.json());

app.use(helmet());

app.use(compression());

app.use('/', routes);

app.route('/')
    .get((request, response) => {
        response.sendFile(process.cwd() + '/index.html');
    });

app.use('/uploads', express.static('./uploads'));

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000
      },
    (err) => {
        if(err) return console.log("Error: ", err);

        console.log("MongoDB Connection -- Ready state is: ", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`App is listening on port ${listener.address().port}.`);
});