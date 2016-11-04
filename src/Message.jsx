import React, { Component } from 'react';

let Message = props => {
  console.log(`message: ${props.message.type}`);
  if (props.message.type === 'incomingMessage') {
    return (
      <div className="message">
        <span className="username" style={{color: props.message.color}}>{props.message.username}</span>
        <span className="content">{props.message.content}</span>
      </div>
    );
  }
  else if (props.message.type === 'incomingNotification') {
    return (
      <div className="message system">
        {props.message.notification}
      </div>
    );
  }
  else if (props.message.type === 'incomingImage') {
    return (
      <div className="image">
        <span className="username" style={{color: props.message.color}}>{props.message.username}</span>
        <img src={props.message.url} alt={props.message.type} style={{width: props.message.size}}/>
      </div>
    );
  }
  else {
    return null;
  }
}
// class Message extends Component {
//   render() {
//     return (
//       <div className="message">
//         <span className="username">{this.props.message.username}</span>
//         <span className="content">{this.props.message.content}</span>
//       </div>
//     );
//   }
// }
export default Message;
