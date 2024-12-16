import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generatedAccessToken = async (userId)=>{
    // try {
        const token = await jwt.sign({id: userId},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'1h'})

        return token
        
    // } catch (error) {
    //     console.error(error)
    //     throw new Error('Could not generate access token')
    // }
}

export default generatedAccessToken