import amqp from 'amqplib'
import express from 'express'

const app = express()
app.use(express.json())
let channel 
let connection
const queue= 'order'
app.post("/send",(req,res)=>{
    const msg= req.body.message
    if(!msg){ 
        return res.status(400).send({error:"message is required"})
    }
    
    if(!channel){
        return res.status(500).send({error:"channel not established"})
    }
    try{
        //sending the message to rabbitmq queue
        channel.sendToQueue(queue,Buffer.from(msg))
        console.log(`[x] sent to queue: ${msg}`)
    }catch(err){
        console.log("failed")
    }

})
async function connectAndStartUp(){
    try{
        //create rabbitmq connection and channel
        console.log('trying to connect')
        connection = await amqp.connect('amqp://user2:password2@rabbitmq')
        channel= await connection.createChannel()
        await channel.assertQueue(queue,{durable:true})
        console.log("connected to rabbitmq")
        app.listen(3000,()=>{
            console.log('producer server started ')
        })
    }
    catch(err){

        console.log(err.message)
        if(err.message.includes('connect ECONNREFUSED')){
            setTimeout(()=>connectAndStartUp(),5000)
        }
    }
}
connectAndStartUp()
