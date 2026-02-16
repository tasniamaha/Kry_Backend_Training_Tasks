import fs from 'fs'
import path from 'path'

const file=process.argv[2]

if(!file){
    console.log('Provide file name')
    process.exit(1)
}

const filepath=path.resolve(file)

fs.readFile(filepath,'utf-8',(err,data)=>{
    if(err){
        return console.error('Error',err.message)
    }
    console.log(data)
})