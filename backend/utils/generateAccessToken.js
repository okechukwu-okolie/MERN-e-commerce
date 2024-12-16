import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generatedAccessToken = async (userId)=>{
    
        const token = await jwt.sign(   {id: userId},//user id + secret token secret + expiry time
                                        process.env.ACCESS_TOKEN_SECRET,
                                        {expiresIn:'1d'})

        return token
        
   
}

export default generatedAccessToken