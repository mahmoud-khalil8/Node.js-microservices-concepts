import amqp from 'amqplib';

const queue = 'order';
let channel;
let connection;

async function connectAndConsume() {
    try {
        connection = await amqp.connect('amqp://user2:password2@rabbitmq');
        channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });
        
        console.log(`[*] Waiting for messages in queue: ${queue}`);
        
        // Consume messages from the queue
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const messageContent = msg.content.toString();
                console.log(`[x] Received: ${messageContent}`);
                
                channel.ack(msg);
            }
        }, {
            noAck: false  
        });
    } catch (err) {
        console.error("Error in connecting to RabbitMQ:", err.message);
        
        // Retry connection after a delay if there’s a connection error
        if (err.message.includes('connect ECONNREFUSED')) {
            setTimeout(connectAndConsume, 5000);
        }
    }
}

// Start the consumer
connectAndConsume();
