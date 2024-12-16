import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:[true,'the name is a required field'],
    },
    email:{
        type:String,
        required:[true,'the email is a required field'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'the password is a required field']
    },
    avatar:{
        type:String,
        default:''
    },
    mobile:{
        type:Number,
        default:null
    },
    refresh_token:{
        type:String,
        default:""
    },
    verify_email:{
        type:Boolean,
        default:false
    },
    last_login_date:{
        type:Date,
        default:""
    },
    status:{
        type:String,
        enum:["Active","Inactive","Suspended"],
        default:"Active"
    },

    address_details:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'address'
        }
    ],
    shopping_cart:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'cartProduct'
        }
    ],
    orderHistory:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'order'
        }
    ],
    forgot_password_otp:{
        type:String,
        default:null
    },
    forget_password_expiry:{
        type:Date,
        default:""
    },
    role:{
        type: String,
        enum:['ADMIN','USER'],
        default: "USER"
    }
},{
    timestamps:true
})

const UserModel = mongoose.model('user',userSchema)

export default UserModel