const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/items');
const deliveryVehicles = require('./routes/deliveryVehicles');
const orders = require('./routes/orders');

mongoose.connect('mongodb://localhost:27017/logistics');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({extended: true}))

app.use('/items', items);
app.use('/deliveryVehicles', deliveryVehicles);
app.use('/orders', orders);

app.listen(3000, () => {
    console.log('Serving on port 3000');
})