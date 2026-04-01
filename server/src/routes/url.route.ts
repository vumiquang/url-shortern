import { Router } from 'express'
import { urlController } from '@/controllers'
import { asyncHandler } from '@/utils'
import { validate } from '@/middlewares/validate.middleware'
import { urlShotenCreateSchema } from '@/schemas/url.schema'

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
 *    responses:
 *      201:
 *        description: 
 */
router.post('/shorten', validate(urlShotenCreateSchema), asyncHandler(urlController.createUrlShorten))
router.get('/:urlShorten', asyncHandler(urlController.redirectUrl))

export default router
