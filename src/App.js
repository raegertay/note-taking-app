import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import List from './List';
import Note from './Note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      items: new Map(),
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
    const new_items = new Map(this.state.items);
    const new_title = this.state.title === '' ? '<No title>' : this.state.title;
    const new_description = this.state.description === '' ? '<No description>' : this.state.description;
    new_items.set(this.state.item_id, [new_title, new_description]);
    this.setState({
      title: '',
      description: '',
      items: new_items,
      item_id: (this.state.item_id + 1),
    });
  }

  handleDeleteClick = (id) => {
    const item_id = parseInt(id);
    const new_items = new Map(this.state.items);
    new_items.delete(item_id);
    this.setState({items: new_items});
  }

  handleEditClick = (id) => {
    const item_id = parseInt(id);
    const new_items = new Map(this.state.items);
    const new_title = this.state.title === '' ? this.state.items.get(id)[0] : this.state.title;
    const new_description = this.state.description === '' ? this.state.items.get(id)[1] : this.state.description;
    new_items.set(item_id, [new_title, new_description]);
    this.setState({
      title: '',
      description: '',
      items: new_items,
    });
  }

  render() {
    // let li_arr = [];
    // this.state.items.forEach((note, item_id) => li_arr.push([item_id, note]));
    return (
      <Router>
        <div>
          <h1 className='center'>Note Taking App</h1>
          <form className='App' onSubmit={this.onSubmit}>
            <input value={this.state.title} onChange={this.onTitleChange} placeholder='Title'/>
            <br /><br />
            <input value={this.state.description} onChange={this.onDescriptionChange} placeholder='Description' />
            <br /><br />
            <button>Create Note</button>
          </form>
          <br />
          <hr />
          <div className='flex-container'>
            <div className='list'>
              <p className='center'><u>All Notes</u></p>
              <List items={this.state.items} />
            </div>
            <div className='note center'>
              <p> </p>
              <Note
              items={this.state.items}
              onDeleteClick={(item_id) => this.handleDeleteClick(item_id)}
              onEditClick={(item_id) => this.handleEditClick(item_id)}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
