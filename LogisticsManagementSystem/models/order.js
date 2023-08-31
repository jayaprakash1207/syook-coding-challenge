const mongoose = require('mongoose');
const DeliveryVehicle = require('./deliveryVehicle')
const Schema = mongoose.Schema;

const OrderSchema = Schema({
    orderNumber: { type: String, unique: true, required: true },
    itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    price: { type: Number, required: true }, 
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    deliveryVehicleId: { type: Schema.Types.ObjectId, ref: 'DeliveryVehicle', required: true },
    isDelivered: { type: Boolean, default: false },
});

OrderSchema.pre('save', async function (next) {
    if(!this.orderNumber) {
        const lastOrder = await this.constructor.findOne({}, {}, {sort: {orderNumber: -1}});
        const lastOrderNumber = lastOrder ? parseInt(lastOrder.orderNumber) : 0;
        this.orderNumber = (lastOrderNumber + 1).toString().padStart(4, '0');
    }
    next();
});

OrderSchema.post('findOneAndUpdate', async function(doc) {
    if(doc && doc.isDelivered) {
        await DeliveryVehicle.findOneAndUpdate(
            {_id: doc.deliveryVehicleId},
            {$inc: {activeOrdersCount: -1}}
        );
    }
});

module.exports = mongoose.model('Order', OrderSchema);