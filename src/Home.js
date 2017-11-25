import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ProjectLinks from './ProjectLinks';

class Home extends Component {
  render() {
    return (
      <div>
        <div className='center'>
          <h1>Note Taking App</h1>
          <p>Enter a new or existing project name:</p>
          <input
            value={this.props.name}
            onChange={this.props.onNameChange} />
          <br /><br />
          <Link to={`/${this.props.name}`}>Enter</Link>
        </div>
        <div>
          <h4>My Projects</h4>
          <ProjectLinks
            projects={this.props.projects}
            onProjectClick={(name) => this.props.onProjectClick(name)}
            onDeleteClick={(name) => this.props.onDeleteClick(name)}
          />
      </div>
    </div>
    )
  }
}

export default Home;
