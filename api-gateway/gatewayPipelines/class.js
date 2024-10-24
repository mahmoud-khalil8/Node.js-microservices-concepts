const express = require('express')
const app = express()

app.get('/class',(req,res,next)=>{
    res.send(['class1','class2','class3','class4'])
})

app.listen(4000,()=>{
    console.log('server is running on 4000 port')
})
