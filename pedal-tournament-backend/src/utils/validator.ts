import type { z } from 'zod'
import type { SyncRouterHandler } from '../types'
import { ZodError } from 'zod'

type AnyZodObject = z.ZodType<Record<string, unknown>>
type ValidatorSchema = (schema: AnyZodObject) => SyncRouterHandler

export const validatorSchema: ValidatorSchema = (schema: AnyZodObject): SyncRouterHandler => async (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params })
    next()
  }
  catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Invalid request',
        errors: error.flatten().fieldErrors,
      })
    }
    else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      })
    }
  }
}
