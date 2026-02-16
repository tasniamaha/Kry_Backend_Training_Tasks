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
    //parse json
    const user=JSON.parse(data)

    for(const index in user){
       const username=user[index].name
       const age=user[index].age
       console.log(`Hello ${username},Your age is ${age}`)
       //console.log(`Hello ${user[index].name}`)
       //console.log(`Your age is ${age}`)
    }
})