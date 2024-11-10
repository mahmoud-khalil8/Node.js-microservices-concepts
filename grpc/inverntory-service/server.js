import grpc from 'grpc'
import protoLoader from '@grpc/proto-loader'
import path from 'path'
const __dirname= path.dirname(new URL (import.meta.url).pathname)
//loading and parsing the .proto file
const packageDefinition = protoLoader.loadSync(
    path.join(__dirname,"../inventory.proto"),
    {
        keepCase:true,
        longs:String,
        enums: String ,
        defaults: true ,
        oneofs:true,
    }
)
const inventoryProto =grpc.loadPackageDefinition(packageDefinition).inventory 
 
const inventory = {}
const server = new grpc.Server()
//defining the service implementation 
server.addService(inventoryProto.InventoryService.service,{
    UpdateInventory:(call,callback)=>{
        const{product_id,quantity} = call.request
        if(!inventory[product_id]){
            inventory[product_id] = 0 
        }
        inventory[product_id]+=quantity
        //sending a response back 
        callback(null ,{
            message: `inventory updated for product ${product_id}`
        })
    }
})
const PORT =50051
//starting the server 
server.bindAsync(`0.0.0.${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    ()=>{
        console.log("inventory service is running ")
    }
)