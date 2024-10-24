const express=require('express')

const app=express()
const port = 3002 ;

app.get('/',(req,res)=>{
    console.log('hello from app 2')
})
app.listen(port,()=>{
    console.log(`app 2 is listening on port ${port}`)
})