import fs from 'fs'
import os from 'os'

const platform=os.platform()

const architecture=os.arch()

console.log(`Platform is ${platform}`)
console.log(`Architecture is ${architecture}`)

const info=`Platform is ${platform}\nArchitecture is ${architecture}`

fs.appendFileSync('os-info.txt',info)

console.log('Os info saved')