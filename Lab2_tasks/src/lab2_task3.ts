import path from 'path'
import fs from 'fs'

const file=process.argv[2]

if(!file){
    console.log('Provide file name')
    process.exit(1)
}
const filepath=path.resolve(file)
fs.stat(filepath,(err,stats)=>{
    if(err){
        console.error('File does not exists');
        process.exit(1)
    }
    const parsed=path.parse(filepath)
    console.log(`File name: ${parsed.base}`)
    console.log(`extension:${parsed.ext}`)
    console.log(`Base:${parsed.base}`)
    //console.log(`file name: ${path.basename(filepath)}`)
    const sizeinByte=stats.size
    const sizeinKb=sizeinByte/1024

    console.log(`size in bytes: ${sizeinByte}`)
    console.log(`size in KB: ${sizeinKb}`)

    const creation_time=stats.birthtime
    const modified_time=stats.mtime
    console.log(`Creation time: ${creation_time}`)
    console.log(`Modified time: ${modified_time}`)

    const type=stats.isFile()?'File':'Directory'
    console.log(`Type: ${type}`)
})