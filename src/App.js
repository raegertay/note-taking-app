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
    console.log('App mounted')
    this.getProjects();
  }

  getProjects = () => {
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
          <div>
            <Switch>
              <Route exact path="/" render={() => <Home
                name={this.state.name}
                projects={this.state.projects}
                onNameChange={this.handleNameChange}
                onProjectClick={(name) => this.handleProjectClick(name)}
                onDeleteClick={(name) => this.handleDeleteClick(name)}
               />}/>
              <Route
                path={`/${this.state.name}`}
                render={() => <NoteManager
                  name={this.state.name}
                  onDeleteClick={(name) => this.handleDeleteClick(name)}
                onBackClick={() => this.getProjects()}/>}
                />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
