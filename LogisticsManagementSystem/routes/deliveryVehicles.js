const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const DeliveryVehicle = require('../models/deliveryVehicle');

router.post('/', catchAsync(async (req, res) => {
    try {
        const deliveryVehicle = new DeliveryVehicle({...req.body});
        await deliveryVehicle.save();
        res.status(201).json(deliveryVehicle);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}));

router.get('/', catchAsync(async (req, res) => {
    try {
        const deliveryVehicles = await DeliveryVehicle.find({});
        res.status(201).json(deliveryVehicles);
    } catch (error) {
        res.status(500).json({error : 'Internal server error'});
    }
}));

router.put('/:id', catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const { activeOrdersCount, ...updateData } = req.body;
        const deliveryVehicle = await DeliveryVehicle.findByIdAndUpdate(id, updateData, {new: true});
        if (!deliveryVehicle) {
            return res.status(404).json({ error: 'Delivery vehicle not found' });
        }
        res.status(201).json(deliveryVehicle);
    } catch(error) {
        res.status(500).json({error : 'Internal server error'});
    }
}));

module.exports = router;