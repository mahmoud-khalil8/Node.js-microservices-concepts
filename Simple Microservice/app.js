const express=require('express')
const app = express()
const port=3000
app.get('/api',(req,res)=>{
    res.send('hello, this is your simple Nodejs app!')
})
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})