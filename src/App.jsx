import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // optional. if currentUser is not defined, it means the user is Anonymous
      currentUser: { name: 'Anonymous' },
      messages: [],
      userCount: 0,
      color: ''
    };
  }

  // functions that comes with react, don't use ES6
  // no need to bind as well because it's all done by react
  // when we do 'extends Component'
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:5000/socketserver');
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }
    this.socket.onmessage = (event) => {
      console.log(`(server -> client) : ${event.data}`)
      const data = JSON.parse(event.data);
      let updatedMessages;
      switch (data.type) {
        case 'incomingMessage':
        case 'incomingNotification':
          updatedMessages = this.state.messages.concat(data);
          this.setState({messages: updatedMessages});
          break;
        case 'incomingUserCount':
          this.setState({userCount: data.count});
          break;
        case 'colorAssigned':
          this.setState({color: data.color})
          break;
        default:
          throw new Error('Unknown event type ' + data.type);
      }
    }
  }

  addMessage = (newMessageContent) => {
    const dataTrim = newMessageContent.replace(/^\s+|\s+$/g,'');
    const regex = /(http).+(.jpg|.png|.gif)$/;
    const postMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: dataTrim,
      color: this.state.color
    }
    if (dataTrim.match(regex)) {
      const url = dataTrim.match(regex)[0];
      const contentTrim = dataTrim.replace(regex, '').replace(/^\s+|\s+$/g,'');
      postMessage.content = contentTrim;
      postMessage.imageURL = url;
      postMessage.style = {
        width: '60%',
        height: '60%'
      }
    }
    console.log(`(client -> server) : ${JSON.stringify(postMessage)}`);
    this.socket.send(JSON.stringify(postMessage));
  }

  changeName = (newName) => {
    const newNameTrim = newName.replace(/^\s+|\s+$/g,'') || 'Anonymous';
    const prevName = this.state.currentUser.name;
    if (prevName != newNameTrim) {
      this.setState({currentUser: {name: newNameTrim}});
      const postNotification = {
        type: 'postNotification',
        notification: `${prevName} changed their name to ${newNameTrim}`
      }
      console.log(`(client -> server) : ${JSON.stringify(postNotification)}`);
      this.socket.send(JSON.stringify(postNotification));
    }

  }

  render() {
    return (
      <div className='wrapper'>
        <nav>
          <h1>Chatty</h1>
          <span id="user-counter">{this.state.userCount} users Online</span>
        </nav>
        <MessageList
          messages={this.state.messages}
          color={this.state.color}
        />
        <ChatBar
          currentUser={this.state.currentUser}
          addMessage={this.addMessage}
          changeName={this.changeName}
        />
      </div>
    );
  }
}
export default App;
