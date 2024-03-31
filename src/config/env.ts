import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  PORT: z.number().default(3000),
  HOST: z.string().default('localhost'),
  DATABASE_URL: z.string(),
  NODE_ENV: z.string(),
})

export const env = envSchema.parse(process.env)
