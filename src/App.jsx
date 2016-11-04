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
          // why use concat
          // does not change the current state until 'setState' is called
          updatedMessages = this.state.messages.concat(data);
          this.setState({messages: updatedMessages});
          break;
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
        case 'incomingImage':
          updatedMessages = this.state.messages.concat(data);
          this.setState({messages: updatedMessages});
          break;
        default:
          throw new Error('Unknown event type ' + data.type);
      }
    }
  }

  addMessage = (newMessageContent) => {
    const postMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: newMessageContent,
      color: this.state.color
    };
    console.log(`(client -> server) : ${JSON.stringify(postMessage)}`);
    this.socket.send(JSON.stringify(postMessage));
  }

  addImage = (newImageUrl) => {
    // const postImage = {
    //   type: 'postImage',
    //   username: this.state.currentUser.name,
    //   url: newImageUrl
    // }
    // console.log(`(client -> server) : ${JSON.stringify(postImage)}`);
    // this.socket.send(JSON.stringify(postImage));
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
          addImage={this.addImage}
          changeName={this.changeName}
        />
      </div>
    );
  }
}
export default App;
