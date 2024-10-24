const express=require('express')

const app=express()
const port = 3001 ;

app.get('/',(req,res)=>{
    console.log('hello from app 1')
})
app.listen(port,()=>{
    console.log(`app 1 is listening on port ${port}`)
})