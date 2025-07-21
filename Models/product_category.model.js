import mongoose from "mongoose";



const product_category_shema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
}, { timestamps: true })

const product_category_model = mongoose.model('product_category', product_category_shema)

export default product_category_model