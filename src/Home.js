import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hello fellow note taker!</h1>
        <p>Please tell me your name:</p>
        <input
          value={this.props.name}
          onChange={this.props.onNameChange} />
        <br /><br />
        <Link to={`/${this.props.name}`}>Enter the App</Link>
      </div>
    )
  }
}

export default Home;
