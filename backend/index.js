import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './configuration/databaseConfig.js'
import userRouter from './route/user.route.js'


const app = express();

//middlewares

app.use(cors({
credentials:true,
origin:process.env.FRONTEND_URI
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy:false
}))

const PORT = 8080 || process.env.PORT

app.get('/',(req,res)=>{
 res.status(200).json({
    message:'the get request is functioning as expected'
 })
})


app.use('/api/user',userRouter)


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`The server is running at port ${PORT}`)
        })
})
