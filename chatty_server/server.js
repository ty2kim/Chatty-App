const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 5000
const PORT = 5000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
// note that { server } is ES6 notation which is equivalent to { server: server}
const wss = new SocketServer({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// ws is the traintrack. the 'socket'
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message', (message) => {
    const newMessage = JSON.parse(message);
    console.log(`User ${newMessage.username} said ${newMessage.content}`);
    newMessage.id = uuid.v4();
    wss.broadcast(JSON.stringify(newMessage));
  });
});
