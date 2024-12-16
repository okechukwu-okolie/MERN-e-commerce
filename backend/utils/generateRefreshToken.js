import jwt from 'jsonwebtoken'
import UserModel from '../schemaModel/UserSchema.js'

const generatedRefreshToken = async (userId)=>{
    
        const token = await jwt.sign({id: userId},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn:'15d'})

        const updateRefreshTokenUser = await UserModel.updateOne(
            {_id: userId},
            { refresh_token: token, }
    )

        return token
        
  
}

export default generatedRefreshToken