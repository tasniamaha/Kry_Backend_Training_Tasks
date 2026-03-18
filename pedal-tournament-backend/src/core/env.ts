/* eslint-disable node/prefer-global/process */
/* src/core/env.ts */
import path from 'node:path'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

expand(
  config({
    path: path.resolve(
      process.cwd(),
      process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    ),
  }),
)

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  API_VERSION: z.string(),
  MONGO_URI: z.string(),
})

export type Env = z.infer<typeof EnvSchema>

const { data: env, error } = EnvSchema.safeParse(process.env)

if (error) {
  console.error('Invalid env')
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2))
  process.exit(1)
}

export default env
