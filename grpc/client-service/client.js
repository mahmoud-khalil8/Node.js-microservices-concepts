import grpc from 'grpc';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { v4 as uuid } from 'uuid';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const orderPackageDefinition = protoLoader.loadSync(
    path.join(__dirname, "../order.proto"),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
);

const orderProto = grpc.loadPackageDefinition(orderPackageDefinition).order.v1;
const client = new orderProto.OrderService("localhost:50052",
    grpc.credentials.createInsecure()
)

client.CreateOrder({product_id:"12345",quantity: 2},(err,res)=>{
    if(err){
        console.error(err)
    }
    else{
        console.log(response)
    }
})