const cluster = require('cluster')
const http = require('http')
//gets the number of cpus
const numCPUs= require('os').cpus().length 
if(cluster.isMaster){

    console.log(`master ${process.pid} is running `) 
    //fork worker processes equals the number of cpus
    for(let i=0;i<numCPUs;i++){
        cluster.fork();
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`)
    }) 
}else{
    //runs in the worker process
    const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('single threaded app')
    })
    const port =3000 
    server.listen(port,()=>{
        console.log('singel threaded app on port 3000')
    })
}
/*the output : master 19964 is running
singel threaded app on port 3000
singel threaded app on port 3000
singel threaded app on port 3000
singel threaded app on port 3000
singel threaded app on port 3000
singel threaded app on port 3000
singel threaded app on port 3000
singel threaded app on port 3000
-------------------------------
each time the 
cluster.fork() runs the code from the top and executes the else statement
*/ 
