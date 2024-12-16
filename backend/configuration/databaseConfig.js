import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


if(!process.env.MONGODB_URI){
    throw new Error ('check the env file for the MONGODB_URI ke')
}

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to the DB');
        
    }
    catch(err){
        console.log('this is the error message:',err)
        process.exit(1)
    }
}


export default connectDB;
