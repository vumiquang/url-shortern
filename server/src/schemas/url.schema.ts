import z from 'zod'

export const urlShotenCreateSchema = z.object({
  body: z.object({
    url: z.url('Url is not valid'),
    urlShorten: z
      .string()
      .min(1, 'Url shorten is required')
      .max(100, 'Url shorten length is a maximum of 100 characters')
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message: 'Short code must be alphanumeric, _ or -'
      })
  })
})

export type urlShortenCreateType = z.infer<typeof urlShotenCreateSchema.shape.body>