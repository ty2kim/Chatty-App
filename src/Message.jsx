import React, { Component } from 'react';

let Message = props => {
  return (
    <div className="message">
      <span className="username" style={{color: props.message.color}}>{props.message.username}</span>
      <span className="content">{props.message.content}</span>
    </div>
  );
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
