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
        <h1>Note Taking App</h1>
        <p>Enter a new or existing project name:</p>
        <input
          value={this.props.name}
          onChange={this.props.onNameChange} />
        <br /><br />
        <Link to={`/${this.props.name}`}>Enter</Link>
      </div>
    )
  }
}

export default Home;
