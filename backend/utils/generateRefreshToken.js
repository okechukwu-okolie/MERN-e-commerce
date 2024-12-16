import jwt from 'jsonwebtoken'
import UserModel from '../schemaModel/UserSchema.js'

const generatedRefreshToken = async (userId)=>{
    // try {
        const token = await jwt.sign({id: userId},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn:'5d'})

        const updateRefreshTokenUser = await UserModel.updateOne(
            {_id: userId},
            {
                refresh_token: token,
            }
    )

        return token
        
    // } catch (error) {
    //     console.error(error)
    //     throw new Error('Could not generate access token')
    // }
}

export default generatedRefreshToken