const express=require('express')

const app=express()
const port = 3003 ;

app.get('/',(req,res)=>{
    console.log('hello from app 3')
})
app.listen(port,()=>{
    console.log(`app 3 is listening on port ${port}`)
})