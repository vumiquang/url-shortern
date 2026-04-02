import { IUrl, UrlModel } from '@/models/url.model'
import { urlShortenCreateType } from '@/schemas/url.schema'
import { AppError, NotFoundError } from '@/utils/errors'

class UrlService {
  async getUrlRedirect(urlShorten: string) {
    if (!urlShorten) throw new AppError('Url not found!')

    const urlExisted = await UrlModel.findOne({ shortCode: urlShorten, expiresAt: { $gte: new Date() } })
    if (!urlExisted) throw new NotFoundError()

    return urlExisted
  }

  async increasingClick(code: string) {
    return UrlModel.updateOne(
      {
        shortCode: code
      },
      {
        $inc: { clicks: 1 }
      }
    )
  }

  async createShorten({ url, urlShorten, expiredAt }: urlShortenCreateType): Promise<IUrl> {
    const urlExisted = await UrlModel.findOne({ shortCode: urlShorten })
    if (urlExisted) throw new AppError('Url shorten has been existed!')

    let expiredTime = new Date()
    expiredTime.setMonth(expiredTime.getMonth() + 1)

    if (expiredAt) {
      expiredTime = new Date(expiredAt)
    }

    if (expiredTime.getTime() <= new Date().getTime()) throw new AppError('The expiration time must be after now!')

    const newUrl = await UrlModel.create({
      originalUrl: url,
      shortCode: urlShorten,
      expiresAt: expiredTime
    })

    return newUrl
  }
}

export default new UrlService()
