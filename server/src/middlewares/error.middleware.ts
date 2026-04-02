import { AppError, DetailError } from '@/utils/errors'
import { Request, Response, NextFunction } from 'express'
import { envConfig } from '@/configs/env.config'

interface ErrorResponse {
  success: false
  message: string
  stack?: string
  timestamp: string
  details?: DetailError[]
  meta?: {
    [key: string]: unknown
  }
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Route ${req.method} ${req.path} not found`, 404)
  next(error)
}

export const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction): void => {
  console.log(':::Error:::', error)
  if (error instanceof AppError) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: error.message,
      timestamp: new Date().toISOString(),
      details: error.details
    }

    if (envConfig.NODE_ENV === 'development') {
      errorResponse.stack = error.stack
    }
    res.status(error.statusCode).json(errorResponse)
    return
  }

  // Handle Mongoose validation errors
  if (error.name === 'ValidationError') {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Validation failed',
      timestamp: new Date().toISOString()
    }

    if (envConfig.NODE_ENV === 'development') {
      errorResponse.message = error.message
      errorResponse.stack = error.stack
    }

    res.status(400).json(errorResponse)
    return
  }

  // Handle Mongoose cast errors
  if (error.name === 'CastError') {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Invalid resource ID',
      timestamp: new Date().toISOString()
    }

    res.status(400).json(errorResponse)
    return
  }

  // Handle Mongoose duplicate key errors
  if (error.name === 'MongoServerError' && (error as unknown as { code: number }).code === 11000) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Duplicate field value',
      timestamp: new Date().toISOString()
    }

    res.status(409).json(errorResponse)
    return
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Invalid token',
      timestamp: new Date().toISOString()
    }

    res.status(401).json(errorResponse)
    return
  }

  if (error.name === 'TokenExpiredError') {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Token expired',
      timestamp: new Date().toISOString()
    }

    res.status(401).json(errorResponse)
    return
  }

  // Handle unhandled errors
  const errorResponse: ErrorResponse = {
    success: false,
    message: envConfig.NODE_ENV === 'production' ? 'Something went wrong' : error.message,
    timestamp: new Date().toISOString()
  }

  if (envConfig.NODE_ENV === 'development') {
    errorResponse.stack = error.stack
  }

  res.status(500).json(errorResponse)
}
