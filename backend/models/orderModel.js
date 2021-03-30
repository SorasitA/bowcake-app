import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }
    }],
    branch: {
        name: {type: String, required: true}
    },
    totalPrice: {type: Number, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPaid: {type:Boolean, default: false},
    paidAt: {type: Date},
    isPrepared: {type:Boolean, default: false},
    isPickedUp: {type:Boolean, default: false},
    pickedUpAt: {type: Date},
}, {
    timestamps:true,
})


const Order = mongoose.model('Order',orderSchema);
export default Order;