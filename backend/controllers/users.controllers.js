//creating a new user
import UserModel from "../schemaModel/UserSchema.js";
import bcryptjs from 'bcryptjs'
import sendEmail from '../configuration/sendEmail.js'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generatedRefreshToken from "../utils/generateRefreshToken.js"
import generatedAccessToken from "../utils/generateAccessToken.js"
import cookie from 'cookie-parser'



export async function registerUserController(req, res) {
    try {
        //destructuring the request body to get the name, email, password
        const {name,email,password} = req.body;
        
        //check if the email already exists
        if(!name || !email || !password){
            return res.status(400).json({
               message:"provide the name, email, password",
               error: true,
               success:false
            })
        }
        const userEmail = await UserModel.findOne({email})

        // if the email already exists, return an error message
        if(userEmail){
            return res.status(400).json({
                message:"email already exists",
                error: true,
                success:false
            })
        }

        //hash the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, 10)
            

      
 
        //save the new user to the database   
        
        
        const newUser = new UserModel({
                                            name,
                                            email,
                                            password: hashedPassword
                                        })
        const save = await newUser.save()
//********************************here is the code for the email verification of successful signin */

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail =await sendEmail({
                sendTo:email,
                subject:'verify email from ecommerce store',
                html:verifyEmailTemplate({
                    name,
                    url:verifyEmailUrl
                })
        }) 

        return res.json({
            message:"User registered succesfully",
            error:false,
            success:true,
            data:save,
        })
  //**************************************************************************************** */      
    } catch (error) {
        return res.status(500).json({
            message:"this is the main error" || error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyEmailController(req,res){
    try {
        const {code} = req.body

        const user = await UserModel.findOne({_id:code})
        if(!user){
            return res.status(404).json({
                message:"user not found",
                error: true,
                success: false
            })
        }
        const updateUser = await UserModel.updateOne({_id:code},{
            verify_email:true
        })
        return res.json({
            message:"email verified successfully",
            error: false,
            success: true,
            data:updateUser,
        })
    } catch (error) {
       return res.status(500).json({
            message:"the email has not been verified" || error,
            error: true,
            success: false
        })
    }
}

//login controller
export async function loginController(req,res){
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                                        message:"provide the email and password",
                                        error: true,
                                        success: false
                                    })
        }

        //checking for the active status of the user login.
        const user =await UserModel.findOne({email})

        if(!user){
            return res.status(404).json({
                message:"user not found",
                error: true,
                success: false
            })
        }
        
        if(user.status !== "Active"){
            return res.status(400).json({
                        message:"Contact Admin",
                        error: true,
                        success: false
                    })
        }
        const checkPassword = await bcryptjs.compare(password,user.password)

        if(!checkPassword){
            return res.status(400).json({
                message:"invalid password",
                error: true,
                success: false
            })
        }

        //sendng access and refresh token
        const accessToken = await generatedAccessToken(user._id)
        const refresh_token = await generatedRefreshToken(user._id)

        const cookiesOptions ={
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }
        res.cookie('accessToken',accessToken, cookiesOptions)
        res.cookie('refresh_token',refresh_token, cookiesOptions)

        return res.json({
            message:"user logged in successfully",
            error: false,
            success: true,
            data:{
                accessToken,
                refresh_token
            }
        })


    } catch (error) {
        res.status(500).json({
            message:"this is the login error" || error.message || error,
            error: true,
            success: false,
        })
    }
}

//logout controller
export async function logoutController(req,res){

    const cookiesOptions ={
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }
    try {
        res.clearCookie('accessToken', cookiesOptions)
        res.clearCookie('refresh_token', cookiesOptions)
        return res.json({
            message:"user logged out successfully",
            error: false,
            success: true,
        })

      

    } catch (error) {
        res.status(500).json({
            message:"this is the logout error" || error.message || error,
            error: true,
            success: false,
        })
    }
}