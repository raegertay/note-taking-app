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
import axios from 'axios'
// lodash library

class App extends Component {
  constructor(props) {
    super(props);
    console.log('App constructed')
    this.state = {
      name: '',
      projects: [],
      myAxios: axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 1000
      })
    }
  }

  componentDidMount = () => {
    console.log('App mounted')
    this.getProjects();
    // console.log('Name:' + this.state.name)
    // console.log('Projects:' + this.state.projects)
  }

  // Fetch
  // getProjects = () => {
  //   fetch(`http://localhost:3000/api/projects`)
  //   .then(res => {
  //     console.log(res)
  //     return res.json()
  //   })
  //   .then(
  //     (data) => {
  //       console.log(data)
  //       this.setState({
  //         projects: data,
  //       }, console.log('App state set'));
  //     }
  //   )
  //   .catch((error) => {
  //     console.log(error.message)
  //   })
  // }

  // Default axios (GET)
  getProjects = () => {
    console.log(axios)
    axios.get('http://localhost:3000/api/projects')
    .then((response) => {
      console.log(response)
      this.setState({
        projects: response.data,
      }, console.log('App state set'));
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  // Instance axios (GET)
  // getProjects = () => {
  //   const myAxios = this.state.myAxios
  //   myAxios.get('/api/projects')
  //   .then((response) => {
  //     console.log(response)
  //     this.setState({
  //       projects: response.data,
  //     }, console.log('App state set'));
  //   })
  //   .catch((error) => {
  //     console.log(error.message);
  //   });
  // }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleProjectClick = (name) => {
    this.setState({ name: name});
  }

  // Fetch (DELETE)
  // handleDeleteClick = (name) => {
  //   const init = { method: "DELETE" }
  //   fetch(`http://localhost:3000/api/project/${name}/`, init)
  //   .then(res => res.json())
  //   .then((data) => {
  //     this.setState({
  //       projects: data
  //     });
  //   })
  // }

  // Axios (DELETE)
  handleDeleteClick = (name) => {
    const axiosConfig = {
      method: "delete",
      url: `http://localhost:3000/api/project/${name}/`
    }
    axios(axiosConfig)
    .then((response) => {
      this.setState({
        projects: response.data
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
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
