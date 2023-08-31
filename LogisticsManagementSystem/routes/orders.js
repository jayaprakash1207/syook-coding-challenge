const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order');
const Customer = require('../models/customer');
const DeliveryVehicle = require('../models/deliveryVehicle');

router.post('/', catchAsync(async (req, res) => {
    try {
        const {itemId, customerId} = req.body;
        const item = await Item.findById(itemId);
        if(!item) {
            return res.status(404).json({error: 'Item not found'});
        }
        const customer = await Customer.findById(customerId);
        if(!customer) {
            return res.status(404).json({error: 'Customer not found'});
        }
        const deliveryVehicle = await DeliveryVehicle.findOneAndUpdate(
            {city: customer.city, activeOrdersCount: {$lt: 2}},
            {$inc: {activeOrdersCount: 1}}
        );
        if(!deliveryVehicle) {
            return res.status(400).send("No delivery vehicle available");
        }
        const order = new Order({
            itemId,
            price: item.price,
            customerId: customer._id,
            deliveryVehicleId: deliveryVehicle._id,
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}));

router.put('/:id/deliver', catchAsync(async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if(!order) {
            return res.status(404).json({error: 'Order not found'});
        }
        if(order.isDelivered) {
            return res.status(400).send("Order is already delivered");
        }
        order.isDelivered = true;
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}));

module.exports = router;