import jwt from   'jsonwebtoken'
// import dotenv from 'dotenv'
// dotenv.config()

const auth = async (req,res,next)=>{
try {
    const token = req.cookies.accessToken || req?.header?.authorization?.split(" ")[1]
    // console.log('token',token)

    //to verify if the token is valid or not
    if(!token){
        return res.status(401).json({
            message:"the token is not avaliable",
            error:true,
            success:false
        })
    }
    //decrypt token
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    if(!decode){
        return res.status(403).json({
            message:"the token is not valid",
            error:true,
            success:false
        })
    }
// console.log(decode.id);

    req.userId = decode.id
    // console.log('req.userId',req.userId);
    

    next()
    
    

} catch (error) {
   return  res.status(500).json({
         message: error,
         error:true,
         success:false
    })
}
}
export default auth