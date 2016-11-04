import React, { Component } from 'react';
import Message from './Message.jsx';

let MessageList = props => {
    return (
      // <div id="message-list">
      //   {props.messages.map((message) => {
      //     return <Message message={message} key={message.id}/>
      //   })}
      //   <div className="message system">
      //     Anonymous1 changed their name to nomnom.
      //   </div>
      // </div>

      <div id="message-list">
        {props.messages.map((message, index) => {
          return <Message message={message} key={message.id}/>
        })}
      </div>
    );
}
// class MessageList extends Component {
//   render() {
//     return (
//       <div id="message-list">
//         {/* {this.props.messages.map((message, index) => {
//           return <Message message={message} key={index}/>
//         })} */}
//         {this.props.messages.map((message) => {
//           return <Message message={message} key={message.id}/>
//         })}
//         <div className="message system">
//           Anonymous1 changed their name to nomnom.
//         </div>
//       </div>
//     );
//   }
// }
export default MessageList;
