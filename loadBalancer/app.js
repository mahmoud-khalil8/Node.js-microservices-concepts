const express=require('express');
const http =require('http')
const rateLimit=require('express-rate-limit') ;
const morgan =require('morgan') ;
const httpProxy =require('http-proxy')

const app=express();
const port = 3000 ;

const limiter=rateLimit({
    windowMs: 60*1000 ,
    max:10 ,
    message:'rate limit exceeded please try again later',
})
app.use(limiter)

app.use(morgan('combined'))

app.get('/',(req,res)=>{
    res.send('welcome to the gateway');
})
// reverse proxies used by servers to distribute traffic among multiple servers
// it hides the identity of the backend sever from the client 
//LOAD BALANCER 
const proxy=httpProxy.createProxyServer() ;
const services=[
    {target:'http://localhost:3001'},
    {target:'http://localhost:3002'},
    {target:'http://localhost:3003'},
]
app.use('/service*',(req,res)=>{
    const {url}=req;
    const selectedService=services[Math.floor(Math.random()*services.length)];
    proxy.web(req,res,{target:selectedService.target+url})
})

http.createServer((req,res)=>{
    res.end('service 1 response')
}).listen(3001) ;

http.createServer((req,res)=>{
    res.end('service 2 response')
}).listen(3002) ;

http.createServer((req,res)=>{
    res.end('service 3 response')
}).listen(3003) ;

const server =http.createServer(app) ;
server.listen(port,()=>{
    console.log(`edge gateway is running on port ${port}`);
});
