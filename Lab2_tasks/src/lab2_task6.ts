import express from 'express'

const app=express()

app.get('/',(req,res)=>{
    res.send('Hello Night')
})

app.get('/status',(req,res)=>{
    res.json({
        status:'ok',
        time:new Date().toISOString()
    }

    )
})

app.use((req,res)=>{
    res.status(404).send('404 not found')
})
app.listen(4000, () => {
  console.log('Server is running on port 4000');
})