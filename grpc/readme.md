
# Order and Inventory Microservices

 two microservices using gRPC: an **Order Service** and an **Inventory Service**. The **Order Service** allows creating orders and communicates with the **Inventory Service** to update product quantities in real time.


## Code Explanation

- **OrderService** (`orderService.js`): 
  - Defines the `CreateOrder` method, which generates an order ID and communicates with the Inventory Service to update stock.
  
- **InventoryService** (`inventoryService.js`): 
  - Defines the `UpdateInventory` method, which updates the product stock based on incoming requests.

- **Client** (`orderClient.js`): 
  - Sends a sample request to `CreateOrder` to test the service.
  In this project, **gRPC** (Google Remote Procedure Call) enables two microservices—the Order Service and the Inventory Service—to communicate efficiently. gRPC uses Protocol Buffers (protobuf) to define services, serialize messages, and enable high-performance, cross-platform communication. Here’s how it works in this project:

### How Each Service Works

#### Inventory Service (Server)

1. **Define the InventoryService**:
   - The Inventory Service (running on `localhost:50051`) is defined in `inventoryService.js`. It implements an `UpdateInventory` function, which receives a `product_id` and `quantity` from the client request and adjusts the inventory quantity.

2. **Start the gRPC Server**:
   - A gRPC server is created in the Inventory Service to handle requests for `UpdateInventory`.
   - When the server is started, it listens for gRPC requests on `localhost:50051` and waits for clients to call `UpdateInventory`.

#### Order Service (Server and Client)

1. **Define the OrderService**:
   - The Order Service (running on `localhost:50052`) is defined in `orderService.js`. It implements the `CreateOrder` method, which:
     - Generates a unique order ID.
     - Calls the Inventory Service’s `UpdateInventory` method to adjust stock based on the order.

2. **Create an Inventory Service Client**:
   - Inside the `CreateOrder` function, an instance of the Inventory Service client is created using:
     ```javascript
     const inventoryClient = new inventoryProto.InventoryService(
         "localhost:50051",
         grpc.credentials.createInsecure()
     );
     ```
   - This client is configured to connect to the Inventory Service on `localhost:50051` and enables the Order Service to call the `UpdateInventory` method remotely.

3. **Make a Remote Procedure Call (RPC)**:
   - The Order Service uses the Inventory Service client to call `UpdateInventory`, passing `product_id` and `quantity` as arguments:
     ```javascript
     inventoryClient.UpdateInventory(
         { product_id, quantity },
         (error, response) => {
             if (error) {
                 callback(error);
             } else {
                 callback(null, {
                     order_id,
                     message: `Order created with ID ${order_id} and inventory updated for product ${product_id}.`
                 });
             }
         }
     );
     ```
   - The Inventory Service then receives this request and adjusts the product stock accordingly.
   - Once the Inventory Service has processed the request, it responds to the Order Service client with a confirmation message (or an error if there was an issue).

4. **Respond to the Order Service Client**:
   - After receiving a response from the Inventory Service, the Order Service either:
     - Returns a success message (including the generated `order_id` and confirmation of inventory update).
     - Or, if there’s an error (e.g., inventory update fails), returns the error message back to the client.

### How gRPC Enables Efficient Communication

1. **Binary Protocol**: gRPC uses Protocol Buffers, a binary format, which is more compact and faster than JSON or XML.
2. **Direct Method Calls**: gRPC allows the Order Service to call methods on the Inventory Service as if it were a local function, even though they are running on separate servers.

### Summary of Request Flow

1. The Order Service receives a `CreateOrder` request from its client.
2. It generates an order ID and sets up an Inventory Service client.
3. The Order Service calls `UpdateInventory` on the Inventory Service.
4. The Inventory Service processes the inventory update and returns a response.
5. The Order Service sends back the order ID and confirmation message to its client.



## Technologies Used

- **gRPC**: Enables fast and efficient communication between microservices.
- **Protocol Buffers (Protobuf)**: Defines service methods and message types for serialization.
- **Node.js**: Runs the gRPC servers and client.
