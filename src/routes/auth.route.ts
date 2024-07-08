import AuthController from '@/controllers/auth.controller'
import { loginValidateChain } from '@/validators/auth/login.validator'
import { commonValidate } from '@/validators/common.validator'
import { Router } from 'express'

export const AuthRoute = Router()

AuthRoute.post('/login', loginValidateChain, commonValidate, AuthController.login)

export default AuthRoute
