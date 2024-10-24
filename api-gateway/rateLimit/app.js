const express=require('express')
const rateLimit=require('express-rate-limit')
const app=express()
const port=3000 

const {RateLimiterQueue,RateLimiterRes, RateLimiterMemory}=require('rate-limiter-flexible') 
const rateLimitMiddleware=require('./rateLimiter')
const rateLimiter=new RateLimiterMemory({
    points:5 , 
    duration:4 
})

const limiter=rateLimit({
    windowMs:60*1000,
    max:10,
})
app.use(rateLimitMiddleware)
app.use((req,res,next)=>{
    console.log(`[${new Date().toLocaleDateString()}] ${req.method} ${req.path}`)
    next()
})
app.use('/limited',limiter)

app.get('/limited/service',(req,res)=>{
    res.json({message:'this is a limited microservice using token bucket'})
})
app.get('/bucket',(req,res)=>{
    rateLimiter
        .consume(req.ip,1)
        .then(()=>{
            res.json({message:'this is a limited microservice using sliding window'})
        })
        .catch((rateLimiterRes)=>{
            if(rateLimiterRes instanceof RateLimiterRes){
                console.log(rateLimiterRes);
                res.status(429).send("token bucket empty ,too many requests sent")
            }
        })

})
app.listen(port,()=>{
    console.log('api gateway is listening on port 3000')
})