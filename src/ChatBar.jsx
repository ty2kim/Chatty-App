import React, { Component } from 'react';

// use class when 1. want to 'extent Component' 2. want to keep state
// you don't need any functions that inherited from Component, (e.g. componentDidMount)
// you don't need to keep any state, only using props from apps
let ChatBar = props => {
  return (
    <footer>
      <input
        id="username"
        type="text"
        placeholder="Your Name (Optional)"
        onKeyUp={e => {
          if (e.key === 'Enter') {
            props.changeName(e.target.value);
          }
        }}

      />
      <input
        id="new-message"
        type="text"
        placeholder="Type a message and hit ENTER"
        onKeyUp={e => {
          if (e.key === 'Enter' && e.target.value) {
            props.addMessage(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </footer>
  );
}

// class ChatBar extends Component {
//
//   constructor(props) {
//     super(props);
//     // https://github.com/react-toolbox/react-toolbox/issues/652
//     // using 'bind' way
//     //this.handleChange = this.handleChange.bind(this);
//     //this.submitMessage = this.submitMessage.bind(this);
//     this.state = {username: this.props.currentUser.name, message: ''};
//   }
//
//   // need to use ES6 if you don't want to use bind
//   handleChangeMessage = (e) => {
//     this.setState({message: e.target.value});
//   }
//
//   submitMessage = (e) => {
//     if (e.key === 'Enter') {
//       this.props.addMessage(e.target.value);
//       // <bad way!>
//       // this.state.message = '';
//       // this.setState(this.state);
//       // <better way>
//       const emptyMessage = '';
//       this.setState({message: emptyMessage});
//     }
//   }
//
//   handleChangeName = (e) => {
//     //this.state.username = e.target.value;
//     //this.setState(this.state);
//     this.setState({username: e.target.value});
//   }
//
//   updateName = (e) => {
//     if (e.key === 'Enter') {
//       this.props.changeName(e.target.value);
//       const newName = this.state.username;
//       this.setState({username: newName});
//     }
//   }
//
//   render() {
//     return (
//       <footer>
//         <input
//           id="username"
//           type="text"
//           placeholder="Your Name (Optional)"
//           value={this.state.username}
//           onChange={this.handleChangeName}
//           onKeyUp={this.updateName}
//         />
//         <input
//           id="new-message"
//           type="text"
//           placeholder="Type a message and hit ENTER"
//           value={this.state.message}
//           //onChange={(e) => this.handleChange(e)}
//           //to not use callbacks which is bad,
//           //need to use bind(equally bad) or es6(better) when defining functions
//           //if you use es6, no need for bind or callbacks!
//           onChange={this.handleChangeMessage}
//           onKeyUp={this.submitMessage}
//         />
//       </footer>
//     );
//   }
// }
export default ChatBar;
