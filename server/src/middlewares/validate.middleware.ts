import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { ValidationError } from '@/utils/errors'

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.issues.map((errorItem) => ({
          key: errorItem.path[1] as string,
          message: errorItem.message
        }))
        throw new ValidationError('Validate error!', details)
      }
      throw error
    }
  }
}
