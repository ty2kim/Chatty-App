import React, { Component } from 'react';

// use class when 1. want to 'extent Component' 2. want to keep state
// you don't need any functions that inherited from Component, (e.g. componentDidMount)
// you don't need to keep any state

let Chatbar = props =>
  <footer>
    <input
      id="username"
      type="text"
      placeholder="Your Name (Optional)"
      onKeyUp={event => {
        if (event.key === 'Enter') {
          props.changeName(event.target.value);
        }
      }}
    />
    <input
      id="new-message"
      type="text"
      placeholder="Type a message and hit ENTER"
      onKeyUp={event => {
        if (event.key === 'Enter') {
          props.addMessage(event.target.value);
          event.target.value = ''
        }
      }}
    />
  </footer> 
export default ChatBar;
