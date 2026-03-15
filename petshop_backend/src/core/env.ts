import {config} from 'dotenv'
import {expand} from 'dotenv-expand'
import {z} from 'zod'
import path from 'path'

expand(
    config({
        path:path.resolve(
        process.cwd(),
        process.env.NODE_ENV==='test'?'.env.test':'.env',
    ),
    }),
)

const EnvSchem=z.object({
    NODE_ENV: z.string(),
    API_VERSION:z.string(),
})

export type env=z.infer<typeof EnvSchem>

const {data:env,error}=EnvSchem.safeParse(process.env)

if(error){
    console.error('Invalid env')
    console.error(JSON.stringify(error.flatten().fieldErrors,null,2))
    process.exit(1)
}

export default env