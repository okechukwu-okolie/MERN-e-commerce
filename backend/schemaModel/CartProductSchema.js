
import mongoose from 'mongoose'

const cartProductSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number,
        default: 1
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:'user'
    }

},{
    timestamps: true
})

const CartProduct = mongoose.model('cartProduct',cartProductSchema)

export default CartProduct