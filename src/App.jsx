import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    var data = {
      // optional. if currentUser is not defined, it means the user is Anonymous
      currentUser: { name: 'Bob' },
      messages: [
        // {
        //   //id: 1,
        //   username: 'Bob',
        //   content: 'Has anyone seen my marbles?',
        // },
        // {
        //   //id: 2,
        //   username: 'Anonymous',
        //   content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
        // },
      ],
    };
    super(props);
    // it's ok to do this in constructors
    this.state = data;
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
      const newMessage = JSON.parse(event.data);
      const updatedMessages = this.state.messages.concat(newMessage);
      this.setState({messages: updatedMessages});
    }
  }

  addMessage = (newIncomingMessage) => {
    // const newMessage = {username: this.state.currentUser.name, content: newIncomingMessage};
    // // why use concat
    // // does not change the current state until 'setState' is called
    // const updatedMessages = this.state.messages.concat(newMessage);
    // this.setState({messages: updatedMessages});
    const message = {
      id: '',
      username: this.state.currentUser.name,
      content: newIncomingMessage
    };
    this.socket.send(JSON.stringify(message));
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
        />
      </div>
    );
  }
}
export default App;
