const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Item = require('../models/item');

router.post('/', catchAsync(async (req, res) => {
    try {
        const item = new Item({...req.body});
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({error : 'Internal server error'});
    }
}));

router.get('/', catchAsync(async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(201).json(items);
    } catch (error) {
        res.status(500).json({error : 'Internal server error'});
    }
}));

router.get('/:id', catchAsync(async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) {
            return res.status(404).json({error: 'Item not found'});
        }
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({error : 'Internal server error'});
    }
}));

router.put('/:id', catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByIdAndUpdate(id, { ...req.body});
        if(!item) {
            return res.status(404).json({error: 'Item not found'});
        }
        res.status(201).json(item);
    } catch(error) {
        res.status(500).json({error : 'Internal server error'});
    }
}));

module.exports = router;