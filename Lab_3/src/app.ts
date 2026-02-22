import express from 'express'
import {corsConfig, helmetConfig} from './core/app.config'

const app=express()

//cors
app.use(corsConfig)
app.use(helmetConfig)
app.get('/',(req,res)=>{
    return res.send('hello')
})
export default app