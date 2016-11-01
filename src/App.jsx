import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    var data = {
      // optional. if currentUser is not defined, it means the user is Anonymous
      currentUser: { name: 'Bob' },
      messages: [
        {
          //id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          //id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
        },
      ],
    };
    super(props);
    this.state = { data: data };
  }

  render() {
    return (
      <div className='wrapper'>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.data.messages}/>
        <ChatBar currentUser={this.state.data.currentUser.name}/>
      </div>
    );
  }
}
export default App;
