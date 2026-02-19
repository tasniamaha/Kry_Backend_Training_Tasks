import fs from 'fs'
import path from 'path'

const args=process.argv.slice(2)

const filepath=path.resolve(process.cwd(),'contacts.json')
//console.log(filepath)
type contacts={
    name:string,
    email:string,
    phone:string
}
function loaddata():contacts[]{
    try{
        if(!fs.existsSync(filepath)){
            fs.writeFileSync(filepath,JSON.stringify([])) //create file with empty array if file not exists
        }
        const data=fs.readFileSync(filepath,'utf-8')
        if (!data.trim()) { 
            return []
        }
        return JSON.parse(data)
    }
    catch(error){
        console.error('Could not read file')
        process.exit(1)
    }
}

function savedata(contact: contacts[]){
    try{
        fs.writeFileSync(filepath,JSON.stringify(contact,null,2))
    }
    catch(err){
        console.error('Could not write file \n'+(err as Error).message)
    }
}
const contacts=loaddata()
const command=args[0]
if(command=='add'){
    if(args.length<4){
        console.error('Not enough arguments')
        process.exit(1)
    }

    const [,name,email,phone]=args

   contacts.push({ name, email, phone })

   savedata(contacts)
   console.log('Contacts added successfully')
}
else if(command=='list'){
    if(contacts.length==0){
        console.log('no contacts found')
        process.exit(1)
    }
    for(const index in contacts){
        const name=contacts[index]?.name
        const email=contacts[index]?.email
        const phone=contacts[index]?.phone

        console.log(`Name: ${name}`)
        console.log(`Email: ${email}`)
        console.log(`Phone: ${phone}`)

    }
}

else if(command=='get'){
    if( args.length!=2){
        console.error('Should provide one name')
        process.exit(1)
    }
    const name=args[1]
    let contact
    for (const index in contacts) {
    if (contacts[index]?.name=== name) {
        contact = contacts[index]
        break
    }
}
    if(!contact){
        console.log('Contact does not exists')
        process.exit(1)
    }
    
    console.log(`Name: ${contact.name}`)
    console.log(`Email: ${contact.email}`)
    console.log(`Phone: ${contact.phone}`)


}