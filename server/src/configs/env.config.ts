import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string()
})

export const validateEnv = () => {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    console.log('❌ ENV is invalid:')
    const pretty = z.prettifyError(parsed.error)
    console.log(pretty)
    process.exit(1)
  }

  return parsed.data
}

export const envConfig = validateEnv()

export type EnvConFigType = z.infer<typeof envSchema>
