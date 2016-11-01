import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="username">{this.props.message.username}</span>
        <span className="content">{this.props.message.content}</span>
      </div>
    );
  }
}
export default Message;
