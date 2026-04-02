import { rateLimit } from 'express-rate-limit'
import { envConfig } from '@/configs/env.config'
import { AppError } from '@/utils/errors'

export const redirectLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: envConfig.NODE_ENV === 'development' ? 100 : 15,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    next(new AppError('Too many requests from this IP address, please try again after 15 minutes.', 429))
  }
})

export const createLinkLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    next(new AppError('You have reached your link creation limit. Please come back in 1 hour.', 429))
  }
})
