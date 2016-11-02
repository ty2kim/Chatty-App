import React, { Component } from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    // https://github.com/react-toolbox/react-toolbox/issues/652
    // using 'bind' way
    //this.handleChange = this.handleChange.bind(this);
    //this.submitMessage = this.submitMessage.bind(this);
    this.state = {message: '', username: this.props.currentUser.name};
  }

  // need to use ES6 if you don't want to use bind
  handleChange = (e) => {
    this.setState({message: e.target.value});
  }

  submitMessage = (e) => {
    if (e.key === 'Enter') {
      this.props.addMessage(e.target.value);
      // <bad way!>
      // this.state.message = '';
      // this.setState(this.state);
      // <better way>
      const emptyMessage = '';
      this.setState({message: emptyMessage});
    }
  }

  // handleChangeName(e) {
  //   this.state.username = e.target.value;
  //   this.setState(this.state);
  // }
  //
  // changeName(e) {
  //   if (e.key === 'Enter') {
  //     this.props.changeName(e.target.value);
  //     this.setState(this.state);
  //   }
  // }

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.props.currentUser.name}
          //onChange={this.handleChangeName}
          //onKeyUp={this.changeName}
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          //onChange={(e) => this.handleChange(e)}
          //to not use callbacks which is bad,
          //need to use bind(equally bad) or es6(better) when defining functions
          //if you use es6, no need for bind or callbacks!
          onChange={this.handleChange}
          onKeyUp={this.submitMessage}
        />
      </footer>
    );
  }
}
export default ChatBar;
