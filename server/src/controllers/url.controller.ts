import { Request, Response } from 'express'
import { urlService } from '@/services'

class UrlController {
  async redirectUrl(req: Request, res: Response) {
    const urlShorten = (req.params.urlShorten as string) || ''

    const url = await urlService.getUrlRedirect(urlShorten)

    urlService.increasingClick(url.shortCode)
    return res.redirect(url.originalUrl)
  }

  async createUrlShorten(req: Request, res: Response) {
    const { url, urlShorten, expiredAt } = req.body
    const urlData = await urlService.createShorten({ url, urlShorten, expiredAt })
    res.status(201).json({
      urlData
    })
  }
}

export default new UrlController()
