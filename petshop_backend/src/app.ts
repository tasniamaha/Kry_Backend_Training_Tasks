import express from 'express'
import {corsConfig, helmetConfig} from './core/app.config'
import routerv1 from './routes'
import env from './core/env'
const app=express()

//cors
app.use(corsConfig)
app.use(helmetConfig)
app.get('/',(req,res)=>{
    res.json({
        message:'Server is running',
        data:{
            version:env?.API_VERSION,
            environment:env?.NODE_ENV
        }
    })
});

app.use('/api/v1',routerv1)
export default app