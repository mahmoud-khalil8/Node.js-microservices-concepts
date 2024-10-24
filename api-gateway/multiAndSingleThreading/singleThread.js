const http = require('http')

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('single threaded app')
})
const port =3000 
server.listen(port,()=>{
    console.log('singel threaded app on port 3000')
})