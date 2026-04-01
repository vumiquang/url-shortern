import { RequestHandler } from 'express'

export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export const isValidUrl = (url: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(https?:\/\/)((([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[^\s]*)?$/
  return regex.test(url)
}
