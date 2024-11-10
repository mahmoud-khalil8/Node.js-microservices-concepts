import grpc from 'grpc';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { v4 as uuid } from 'uuid';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Loading and parsing the .proto files for order and inventory services
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
const inventoryPackageDefinition = protoLoader.loadSync(
    path.join(__dirname, "../inventory.proto"),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
);

// Loading package definitions into gRPC-compatible objects
const inventoryProto = grpc.loadPackageDefinition(inventoryPackageDefinition).inventory;
const orderProto = grpc.loadPackageDefinition(orderPackageDefinition).order;

const server = new grpc.Server();

// Defining the order service implementation
server.addService(orderProto.orderService.service, {
    CreateOrder: (call, callback) => {
        const { product_id, quantity } = call.request;
        const order_id = uuid();

        // Creating a client for the InventoryService
        const inventoryClient = new inventoryProto.InventoryService(
            "localhost:50051",
            grpc.credentials.createInsecure()
        );

        // Calling UpdateInventory on the InventoryService
        inventoryClient.UpdateInventory(
            { product_id, quantity },
            (error, response) => {
                if (error) {
                    callback(error); // Return error to client if inventory update fails
                } else {
                    callback(null, {
                        order_id,
                        message: `Order created with ID ${order_id} and inventory updated for product ${product_id}.`
                    });
                }
            }
        );
    }
});

const PORT = 50052;

// Starting the order server
server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log(`Order service is running on port ${PORT}`);
    }
);
