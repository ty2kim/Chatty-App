import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // optional. if currentUser is not defined, it means the user is Anonymous
      currentUser: { name: '' },
      messages: []
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
          updatedMessages = this.state.messages.concat(data);
          this.setState({messages: updatedMessages});
          break;
        case 'incomingNotification':
          updatedMessages = this.state.messages.concat(data);
          this.setState({messages: updatedMessages});
          break;
        default:
          throw new Error('Unknown event type ' + data.type);
      }
    }
  }

  addMessage = (newMessageContent) => {
    // const newMessage = {username: this.state.currentUser.name, content: newIncomingMessage};
    // // why use concat
    // // does not change the current state until 'setState' is called
    // const updatedMessages = this.state.messages.concat(newMessage);
    // this.setState({messages: updatedMessages});
    if (newMessageContent) {
      const postMessage = {
        type: 'postMessage',
        username: this.state.currentUser.name || 'Anonymous',
        content: newMessageContent
      };
      console.log(`(client -> server) : ${JSON.stringify(postMessage)}`);
      this.socket.send(JSON.stringify(postMessage));
    }
  }

  changeName = (newName) => {
    // const prevName = this.state.currentUser.name || 'Anonymous';
    // this.setState({currentUser: {name: newName}});
    // const postNotification = {
    //   type: 'postNotification',
    //   content: `${prevName} changed their name to ${newName}`
    // }
    // console.log(`(client -> server) : ${JSON.stringify(postNotification)}`);
    // this.socket.send(JSON.stringify(postNotification));

    const newNameTrim = newName.replace(/^\s+|\s+$/g,'') || 'Anonymous';
    const prevName = this.state.currentUser.name || 'Anonymous';
    if (prevName != newNameTrim) {
      this.setState({currentUser: {name: newName}});
      const postNotification = {
        type: 'postNotification',
        content: `${prevName} changed their name to ${newNameTrim}`
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
        </nav>
        <MessageList messages={this.state.messages}/>
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
