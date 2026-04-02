import { Router } from 'express'
import { urlController } from '@/controllers'
import { asyncHandler } from '@/utils'
import { validate } from '@/middlewares/validate.middleware'
import { urlShotenCreateSchema } from '@/schemas/url.schema'
import { redirectLimiter, createLinkLimiter } from '@/middlewares/limit.middleware'

const router = Router()
/**
 * tags:
 *  name: Url
 *  description: Url shorten
 */
/**
 * @swagger
 * /shorten:
 *  post:
 *    tags: [Url]
 *    summary: Shorten url
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *              urlShorten:
 *                type: string
 *              expiredAt:
 *                type: string
 *                format: date-time
 *    responses:
 *      201:
 *        description:
 */
router.post(
  '/shorten',
  createLinkLimiter,
  validate(urlShotenCreateSchema),
  asyncHandler(urlController.createUrlShorten)
)

/**
 * @swagger
 * /{urlShorten}:
 *  get:
 *    tags: [Url]
 *    summary: Redirect url
 *    parameters:
 *      - in: path
 *        name: urlShorten
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Origin url
 */
router.get('/:urlShorten', redirectLimiter, asyncHandler(urlController.redirectUrl))

export default router
