// Exercise 1: Simple Node.js HTTP Web Server
// Importing the built-in 'http' module using require()
const http = require('http');

// Define server configuration
const PORT = 3000;
const HOST = 'localhost';

// Define the request handler (request-response callback function)
function requestHandler(request, response) {
    const { method, url } = request;

    // Log each incoming request to the console
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);

    // Route handling based on URL
    if (url === '/' || url === '/home') {
        // Set response headers
        response.setHeader('Content-Type', 'text/html');
        response.setHeader('X-Powered-By', 'Node.js');

        // Set HTTP status code
        response.statusCode = 200;

        // Write the response body and end the response
        response.write('<!DOCTYPE html>');
        response.write('<html lang="en">');
        response.write('<head><meta charset="UTF-8"><title>Node.js Server</title></head>');
        response.write('<body>');
        response.write('<h1>Welcome to the Node.js HTTP Server!</h1>');
        response.write('<p>Server is running successfully on port ' + PORT + '</p>');
        response.write('<ul>');
        response.write('<li><a href="/">Home</a></li>');
        response.write('<li><a href="/about">About</a></li>');
        response.write('<li><a href="/data">Data (JSON)</a></li>');
        response.write('</ul>');
        response.write('</body></html>');
        response.end();

    } else if (url === '/about') {
        response.setHeader('Content-Type', 'text/html');
        response.statusCode = 200;

        response.write('<html><body>');
        response.write('<h1>About This Server</h1>');
        response.write('<p>This is a simple HTTP server built with Node.js core modules only.</p>');
        response.write('<p>No external frameworks were used — just the built-in <code>http</code> module.</p>');
        response.write('<a href="/">Back to Home</a>');
        response.write('</body></html>');
        response.end();

    } else if (url === '/data') {
        // Respond with JSON data
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200;

        const data = {
            server: 'Node.js HTTP Server',
            version: process.version,
            uptime: process.uptime().toFixed(2) + ' seconds',
            timestamp: new Date().toISOString(),
            message: 'Hello from the server!'
        };

        response.end(JSON.stringify(data, null, 2));

    } else {
        // Handle 404 - Not Found
        response.setHeader('Content-Type', 'text/html');
        response.statusCode = 404;

        response.write('<html><body>');
        response.write('<h1>404 - Page Not Found</h1>');
        response.write('<p>The requested URL <strong>' + url + '</strong> was not found.</p>');
        response.write('<a href="/">Go to Home</a>');
        response.write('</body></html>');
        response.end();
    }
}

// Create the HTTP server using createServer(), passing the callback
const server = http.createServer(requestHandler);

// Start listening on the specified port using listen()
server.listen(PORT, HOST, () => {
    // Display server status in the console
    console.log('=========================================');
    console.log('   Node.js HTTP Server Started');
    console.log('=========================================');
    console.log(`Server running at: http://${HOST}:${PORT}/`);
    console.log(`Node.js version  : ${process.version}`);
    console.log(`Started at       : ${new Date().toISOString()}`);
    console.log('-----------------------------------------');
    console.log('Available Routes:');
    console.log(`  GET /       -> Home page (HTML)`);
    console.log(`  GET /about  -> About page (HTML)`);
    console.log(`  GET /data   -> Server info  (JSON)`);
    console.log('=========================================');
    console.log('Press Ctrl+C to stop the server.\n');
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`ERROR: Port ${PORT} is already in use. Try a different port.`);
    } else {
        console.error('Server error:', error.message);
    }
    process.exit(1);
});

// Graceful shutdown on Ctrl+C
process.on('SIGINT', () => {
    console.log('\nShutting down server gracefully...');
    server.close(() => {
        console.log('Server closed. Goodbye!');
        process.exit(0);
    });
});