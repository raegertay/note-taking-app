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
    }
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <Router>
        <div className='center'>
          <Switch>
            <Route exact path="/" render={() => <Home
              name={this.state.name}
              onNameChange={this.handleNameChange} />}/>
            <Route
              path={`/${this.state.name}`}
              render={() => <NoteManager name={this.state.name}/>}
              />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
