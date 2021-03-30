import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    InStock: { type: Boolean, required: true },
    description: { type: String, required: true },

}, {
    timestamps: true // to record timestamp of when record is create or last updated
}
);


const Product = mongoose.model('Product', productSchema)

export default Product;