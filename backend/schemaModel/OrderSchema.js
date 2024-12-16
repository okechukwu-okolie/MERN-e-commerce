import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
userid:{
    type:mongoose.Schema.ObjectId,
    ref:'User'
},
orderId:{
    type:String,
    required:[true,'please provide your orderID'],
    unique:true
},
product_details:{
    type:String,
    image:Array
},
paymentId:{
    type:String,
    default:""
},
payment_status:{
    type:String,
    default:""
},
delivery_address:{
    type: mongoose.Schema.ObjectId,
    ref:'address'
},
subTotalAmt:{
    type:Number,
    default:0
},
TotalAmt:{
    type:Number,
    default:0
},
invoice_receipt:{
    type:String,
    default:""
}

},{
    timestamps: true
})

const Order = mongoose.model('order', orderSchema)

export default Order