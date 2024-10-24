const express = require('express')
const app = express()

app.get('/user',(req,res,next)=>{
    res.send(['student1','student2','student3','student4'])
})

app.listen(3000,()=>{
    console.log('server is running on 3000 port')
})
