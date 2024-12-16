import {Router} from 'express'
import  { registerUserController , verifyEmailController , loginController } from '../controllers/users.controllers.js'


const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)

export default userRouter