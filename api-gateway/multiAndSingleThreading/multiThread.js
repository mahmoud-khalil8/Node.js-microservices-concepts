const cluster = require('cluster')
const http = require('http')

const numCPUs= require('os').cpus().length 
if(cluster.isMaster){

    console.log(`master ${process.pid} is running `)
    for(let i=0;i<numCPUs;i++){
        cluster.fork();
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`)
    }) 
}else{
    const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('single threaded app')
    })
    const port =3000 
    server.listen(port,()=>{
        console.log('singel threaded app on port 3000')
    })
}