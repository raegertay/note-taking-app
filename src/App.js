import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './App.css';
import NoteList from './NoteList';
import NoteRouters from './NoteRouters';
// lodash library

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      notes: new Map(),
      item_id: 1,
    }
    // this.onChange = this.onChange.bind(this);
  }

  onTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  onDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    const new_items = new Map(this.state.notes);
    const new_title = this.state.title === '' ? '<No title>' : this.state.title;
    const new_description = this.state.description === '' ? '<No description>' : this.state.description;
    new_items.set(this.state.item_id, [new_title, new_description]);
    this.setState({
      title: '',
      description: '',
      notes: new_items,
      item_id: (this.state.item_id + 1),
    });
  }

  handleDeleteClick = (id) => {
    const item_id = parseInt(id);
    const new_items = new Map(this.state.notes);
    new_items.delete(item_id);
    this.setState({notes: new_items});
  }

  handleEditClick = (id) => {
    const item_id = parseInt(id);
    const new_items = new Map(this.state.notes);
    const new_title = this.state.title === '' ? this.state.notes.get(id)[0] : this.state.title;
    const new_description = this.state.description === '' ? this.state.notes.get(id)[1] : this.state.description;
    new_items.set(item_id, [new_title, new_description]);
    this.setState({
      title: '',
      description: '',
      notes: new_items,
    });
  }

  // {key1: val1, key2: val2} -> [[key1, val1], [key2, val2]]
  mapToArray = (mapObj) => {
    let arrObj =[];
    mapObj.forEach((val, key) =>
        arrObj.push([key, val])
    );
    return arrObj;
  }

  render() {
    const notes = this.mapToArray(this.state.notes);
    return (
      <Router>
        <div>
          <h1 className='center'>Note Taking App</h1>

          {/* Form */}
          <form className='center form' onSubmit={this.onSubmit}>
            <input value={this.state.title} onChange={this.onTitleChange} placeholder='Title'/>
            <br /><br />
            <input value={this.state.description} onChange={this.onDescriptionChange} placeholder='Description' />
            <br /><br />
            <button>Create Note</button>
          </form>

          <hr />

          {/* Note List */}
          <div className='flex-container'>
            <div className='note-list'>
              <p className='center'><u>All Notes</u></p>
              <NoteList notes={notes} />
            </div>

            {/* Note */}
            <div className='note center'>
              <Switch>
                <NoteRouters
                notes={notes}
                onDeleteClick={(item_id) => this.handleDeleteClick(item_id)}
                onEditClick={(item_id) => this.handleEditClick(item_id)}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
