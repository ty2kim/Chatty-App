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
    // it's ok to do this in constructors
    this.state = data;
  }



  // functions that comes with react, don't use ES6
  // no need to bind as well because it's all done by react
  // when we do 'extends Component'
  componentDidMount() {
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   //Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   //Update the state of the app component.
    //   //Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  addMessage = (newIncomingMessage) => {
    const newMessage = {username: this.state.currentUser.name, content: newIncomingMessage};
    // why use concat
    // does not change the current state until 'setState' is called
    const updatedMessages = this.state.messages.concat(newMessage);
    this.setState({messages: updatedMessages});
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
