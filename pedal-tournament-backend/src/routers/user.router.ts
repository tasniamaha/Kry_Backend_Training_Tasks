import express from 'express'
import { signUpController } from '../controllers'
import { userRegisterSchema } from '../schema'
import { validatorSchema } from '../utils/validator'

const router = express.Router()

router.post('/', validatorSchema(userRegisterSchema), signUpController)
export default router
