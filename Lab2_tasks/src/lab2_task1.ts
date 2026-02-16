import fs from 'fs'
import os from 'os'

const platform=os.platform()
const arch=os.arch()

console.log(`Platform is ${platform}`)
console.log(`Architecture is ${arch}`)

const total_memory=os.totalmem()/1024/1024 //in RAM
const free_memory=os.freemem()/1024/1024
console.log(`Total memory is ${total_memory} MB`)
console.log(`Free memory is ${free_memory} MB`)
const homeDir = os.homedir();
console.log(`home directory is ${os.homedir()}`) 
const currDir=process.cwd()
console.log(`current directory is ${currDir}`)

const firstCPUmodel=os.cpus()[0]?.model
console.log(`CPU model is ${firstCPUmodel}`)
