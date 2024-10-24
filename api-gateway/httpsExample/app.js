const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('hello from the gateway with TLS/SSL');
});

const options = {
    key: fs.readFileSync('private-key-pem'),
    cert: fs.readFileSync('certificate.pem')
};

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
 