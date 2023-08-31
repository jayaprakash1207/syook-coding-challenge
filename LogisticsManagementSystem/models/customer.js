const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: String,
    city: String,
});

module.exports = mongoose.model('Customer', CustomerSchema);