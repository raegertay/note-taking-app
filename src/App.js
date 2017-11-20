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

  onClick = (event) => {
    const item_id = parseInt(event.target.id);
    const new_items = new Map(this.state.items);
    new_items.delete(item_id);
    this.setState({items: new_items});
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
        <List items={this.state.items} />
        {
          li_arr.map((pair, idx) => <button key={pair[0]} id={pair[0]} onClick={this.onClick}>Delete #{idx+1}</button>)
        }
      </div>
    );
  }
}

export default App;
