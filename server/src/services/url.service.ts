import { UrlModel } from '@/models/url.model'
import { urlShortenCreateType } from '@/schemas/url.schema'

class UrlService {
  async getUrlRedirect(urlShorten: string): Promise<string> {
    return urlShorten
  }

  async createShorten({url, urlShorten}: urlShortenCreateType) {}
}

export default new UrlService()
