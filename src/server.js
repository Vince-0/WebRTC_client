const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

// SSL/TLS options
const options = {
    key: fs.readFileSync(path.join(__dirname, '../certs/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../certs/cert.pem'))
};

// Serve static files from the public directory with proper MIME types
app.use(express.static(path.join(__dirname, '../public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`WebRTC client application listening at https://localhost:${port}`);
});
