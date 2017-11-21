import React, { Component } from 'react';
import './App.css';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: new Map(),
      item_id: 1,
    }
    // this.onChange = this.onChange.bind(this);
  }

  onChange = (event) => {
    this.setState({term: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    const new_items = new Map(this.state.items);
    new_items.set(this.state.item_id, this.state.term);
    this.setState({
      term: '',
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
    new_items.set(item_id, this.state.term);
    this.setState({
      term: '',
      items: new_items,
    });
  }

  render() {
    let li_arr = [];
    this.state.items.forEach((term, item_id) => li_arr.push([item_id, term]));
    return (
      <div>
        <form className='App' onSubmit={this.onSubmit}>
          <input value={this.state.term} onChange={this.onChange} />
          <button>Submit</button>
        </form>
        <List
        items={this.state.items}
        onDeleteClick={(item_id) => this.handleDeleteClick(item_id)}
        onEditClick={(item_id) => this.handleEditClick(item_id)}
        />
      </div>
    );
  }
}

export default App;
