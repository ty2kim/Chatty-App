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

const colors = ['red', 'blue', 'green', 'purple', 'black', 'grey', 'orange'];
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// ws is the traintrack. the 'socket'
wss.on('connection', (ws) => {
  console.log('Client connected');
  // assign color
  const randomColor = colors[getRandomIntInclusive(0, colors.length - 1)];
  const colorAssigned = {
    type: 'colorAssigned',
    color: randomColor
  }
  ws.send(JSON.stringify(colorAssigned));
  // broadcast usercounts
  const incomingUserCount = {
    type: 'incomingUserCount',
    count: wss.clients.length
  }
  wss.broadcast(JSON.stringify(incomingUserCount));
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    incomingUserCount.count = wss.clients.length;
    wss.broadcast(JSON.stringify(incomingUserCount));
  });
  // handle messages
  ws.on('message', (data) => {
    data = JSON.parse(data);
    switch (data.type) {
      case 'postMessage':
        data.type = 'incomingMessage';
        data.id = uuid.v4();
        break;
      case 'postNotification':
        data.type = 'incomingNotification';
        break;
      default:
        throw new Error('Unknown message type ' + data.type);
    }
    wss.broadcast(JSON.stringify(data));
  });
});
