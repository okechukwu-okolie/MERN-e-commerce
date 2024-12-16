import { request } from "express"

const auth = async(req,res,next)=>{
try {
    const token = request.cookies.accessToken || request?.header?.authorization.split(" ")[1]

    console.log('token',token)
} catch (error) {
   return  res.status(500).json({
         message:"this is a middleware auth" || error,
         error:true,
         success:false
    })
}
}
export default auth