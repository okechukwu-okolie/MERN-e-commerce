import mongoose from 'mongoose'

const subcategory = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    category:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'category'
        }
    ],
    unit:{
        type:String,
        default:""
    },
    stock:{
        type:String,
        default:null
    },

},{
    timestamps:true
})


const Subcategory = mongoose.model('subcategory',subcategorySchema)

export default Subcategory