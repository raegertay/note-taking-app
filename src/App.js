import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './App.css';
import NoteManager from './NoteManager';
import Home from './Home';
import ProjectLinks from './ProjectLinks';
// lodash library

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      projects: [],
    }
  }

  componentDidMount = () => {
    fetch(`http://localhost:3000/api/projects`)
    .then(res => res.json())
    .then(
      (data) => {
        // console.log(data)
        this.setState({
          projects: data,
        });
      }
    )
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleProjectClick = (name) => {
    this.setState({ name: name});
  }

  handleDeleteClick = (name) => {
    const init = { method: "DELETE" }
    fetch(`http://localhost:3000/api/project/${name}/`, init)
    .then(res => res.json())
    .then((data) => {
      this.setState({
        projects: data
      });
    })
  }

  render() {
    return (
      <Router>
        <div>
          <div className='center'>
            <Switch>
              <Route exact path="/" render={() => <Home
                name={this.state.name}
                onNameChange={this.handleNameChange} />}/>
              <Route
                path={`/${this.state.name}`}
                render={() => <NoteManager
                  name={this.state.name}
                  onDeleteClick={(name) => this.handleDeleteClick(name)}/>}
                />
            </Switch>
          </div>

          {/* Project links */}
          <div>
            <h4>My Projects</h4>
            <ProjectLinks
              projects={this.state.projects}
              onProjectClick={(name) => this.handleProjectClick(name)}
              onDeleteClick={(name) => this.handleDeleteClick(name)}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
