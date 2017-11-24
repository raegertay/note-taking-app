import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import NoteList from './NoteList';
import NoteRouters from './NoteRouters';
import Home from './Home';
// lodash library

class NoteManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      notes: new Map(),
      note_id: 1,
    }
    // this.onChange = this.onChange.bind(this);
  }

  onTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  onDescriptionChange = (event) => {
    this.setState({body: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    const new_items = new Map(this.state.notes);
    const new_title = this.state.title === '' ? '<No title>' : this.state.title;
    const new_description = this.state.body === '' ? '<No body>' : this.state.body;
    new_items.set(this.state.note_id, {title: new_title, body: new_description});
    this.setState({
      title: '',
      body: '',
      notes: new_items,
      note_id: (this.state.note_id + 1),
    });
  }

  handleDeleteClick = (id) => {
    const note_id = parseInt(id);
    const new_items = new Map(this.state.notes);
    new_items.delete(note_id);
    this.setState({notes: new_items});
  }

  handleEditClick = (id) => {
    const note_id = parseInt(id);
    const new_items = new Map(this.state.notes);
    const new_title = this.state.title === '' ? this.state.notes.get(id)[0] : this.state.title;
    const new_description = this.state.body === '' ? this.state.notes.get(id)[1] : this.state.body;
    new_items.set(note_id, [new_title, new_description]);
    this.setState({
      title: '',
      body: '',
      notes: new_items,
    });
  }

  // {1: {title: 'myTitle', body: 'myBody'}} -> [{id: 1, title: 'myTitle', body: 'myBody'}]
  mapToArray = (mapObj) => {
    let arrObj =[];
    mapObj.forEach((note_obj, note_id) =>
        arrObj.push({id: note_id, title: note_obj['title'], body: note_obj['body']})
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
          <div className='center mb'>
            <form className='form mb' onSubmit={this.onSubmit}>
              <input value={this.state.title} onChange={this.onTitleChange} placeholder='Title'/>
              <br /><br />
              <textarea value={this.state.body} onChange={this.onDescriptionChange} placeholder='Body' />
              <br /><br />
              <button>Create Note</button>
            </form>
          </div>

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
                <Route exact path="/" component={Home}/>
                <NoteRouters
                notes={notes}
                onDeleteClick={(note_id) => this.handleDeleteClick(note_id)}
                onEditClick={(note_id) => this.handleEditClick(note_id)}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default NoteManager;
