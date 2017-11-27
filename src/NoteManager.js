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
      notes: [],
      note_id: 1,
    }
    // this.onChange = this.onChange.bind(this);
  }

  componentDidMount = () => {
    console.log('NoteManager mounted')
    console.log(this.props.name)
    const name =  window.location.pathname.split('/')[1]
    fetch(`http://localhost:3000/api/project/${name}`)
    .then(res => res.json())
    .then(
      (data) => {
        // console.log(data)
        this.setState({
          title: '',
          body: '',
          notes: data});
      }
    )
  }

  onSubmit = (event) => {
    event.preventDefault();
    const json_note = JSON.stringify({title: this.state.title, body: this.state.body})
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    const init = { method: "POST", headers: headers, body: json_note }
    fetch(`http://localhost:3000/api/project/${this.props.name}`, init)
    .then(res => res.json())
    .then((data) => {
      this.setState({
        title: '',
        body: '',
        notes: data});
    })
  }

  onTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  onDescriptionChange = (event) => {
    this.setState({body: event.target.value});
  }

  handleDeleteClick = (id) => {
    const init = { method: "DELETE" }
    fetch(`http://localhost:3000/api/project/${this.props.name}/note/${id}`, init)
    .then(res => res.json())
    .then((data) => {
      this.setState({
        notes: data
      });
    })
  }

  handleEditClick = (id) => {
    const json_note = JSON.stringify({title: this.state.title, body: this.state.body})
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    const init = { method: "PUT", headers: headers, body: json_note }
    fetch(`http://localhost:3000/api/project/${this.props.name}/note/${id}`, init)
    .then(res => res.json())
    .then((data) => {
      this.setState({
        title: '',
        body: '',
        notes: data});
    })
  }

  render() {
    // const notes = this.mapToArray(this.state.notes);
    const notes = this.state.notes;
    // if(this.props.name === '') {
    //   return (<div>Loading...</div>)
    // }
    return (
      <div>
        <Link to='/' onClick={this.props.onBackClick}>Back</Link>
        <br />
        <Link
          to='/'
          onClick={() => this.props.onDeleteClick(this.props.name)}>Delete project</Link>
        <Router>
          <div>
            <h1 className='center'>{this.props.name}</h1>

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
      </div>
    );
  }
}

export default NoteManager;
