import { Request, Response } from 'express'
import { urlService } from '@/services'
import { AppError } from '@/utils/errors'

class UrlController {
  async redirectUrl(req: Request, res: Response) {
    const urlShorten = (req.params.urlShorten as string) || ''
    if (!urlShorten) throw new AppError('Url not found!')

    const url = await urlService.getUrlRedirect(urlShorten)
    res.status(200).json({url})
    // res.redirect(url)
  }

  async createUrlShorten(req: Request, res: Response) {
    const { url, urlShorten } = req.body
    await urlService.createShorten({ url, urlShorten })
    res.status(201).json({
      url,
      urlShorten
    })
  }
}

export default new UrlController()
