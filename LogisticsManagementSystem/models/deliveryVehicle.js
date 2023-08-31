const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliveryVehicleSchema = Schema({
    registrationNumber: { type: String, unique: true, required: true },
    vehicleType: { type: String, enum: ['bike', 'truck'], required: true },
    city: { type: String, required: true },
    activeOrdersCount: { type: Number, default: 0, max: 2 },
});

module.exports = mongoose.model('DeliveryVehicle', DeliveryVehicleSchema);