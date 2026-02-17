import path from 'path'
import fs from 'fs'

const args=process.argv.slice(2) //for removing first 2 element of process.argv and pushing command and parameters

if(args.length<2){
    console.log('Not enough arguments')  //including command and parameter there should be atleast 2 arguments
    process.exit(1)
}

const command=args[0]
if(command=='join'){
    if( args.length<3){
        console.log('Not enough arguments,should be atleast 3') //join command+2 path segment
        process.exit(1)
    }
    const joinedPath=path.join(...process.argv.slice(3)) 
    console.log(`${joinedPath}`)
}
else if(command=='basename'){
    if( args.length!=2){
        console.error('Should have one filepath')
        process.exit(1)
    }
    console.log(path.basename(args[1]))
}
else if(command=='extname'){
    if( args.length!=2){
        console.error('Should have one filepath')
        process.exit(1)
    }
    console.log(path.extname(args[1]))
}
else if(command=='resolve'){
    if( args.length!=2){
        console.error('Should have one filepath')
        process.exit(1)
    }
    console.log(path.resolve(args[1]))  
}