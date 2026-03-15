import winston from 'winston'
import dailyRotateFile from 'winston-daily-rotate-file'
import {MongoDB} from 'winston-mongodb'
import env from '../core/env'
import { any } from 'zod'

const levels={
    error:0,
    warn:1,
    info:2,
    http:3,
    verbose:4,
    debug:5
}
const colors={
    error:'red',
    warn:'yellow',
    info:'green',
    http:'magenta',
    debug:'white'
}
const level = () => (env?.NODE_ENV === 'development' ? 'debug' : 'warn')
winston.addColors(colors)
const logFormat=winston.format.combine(
    winston.format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),

    winston.format.splat(),
    winston.format.printf((info)=>{
        if(info.level==='error' && info instanceof Error){
            return `${info}`
        }
        return `${info.timestamp} [${info.level}]: ${info.message}`
    }),
)

const transports=[
    new winston.transports.Console({
        format:winston.format.combine(
            winston.format.colorize({all:true}),
            logFormat,
        )
    }),
]
    
class EnhancedLogger{
    private logger=winston.createLogger({
        level:level(),
        levels,
        format:logFormat,
        transports,
    })
    
    info(...args:any[]){
        const messages=args.map(arg=>typeof arg==='object'?JSON.stringify(arg,null,2):String(arg),
    ).join(' ')
    this.logger.info(messages)
    }

    error(...args:any[]){
        const messages=args.map(arg=>typeof arg==='object'?JSON.stringify(arg,null,2):String(arg),
    ).join(' ')
    this.logger.info(messages)
    }
}

export const Logger=new EnhancedLogger()