import type { Request, Response } from 'express'
import type { CommonController } from '../types/core.type'

export const signUpController: CommonController = async ({ res }) => {
  res.json({
    message: 'user',
    data: {},
  })
}
