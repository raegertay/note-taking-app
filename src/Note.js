import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import NoteContent from './NoteContent';

class Note extends Component {
  render() {
    let li_arr = [];
    this.props.items.forEach((note, item_id) => li_arr.push([item_id, note]));
    return (
        li_arr.map((pair) => { return (
          <Route
          path={`/${pair[0]}`}
          render={()=> <NoteContent
            onDeleteClick={() => this.props.onDeleteClick(pair[0])}
            onEditClick={() => this.props.onEditClick(pair[0])}
            note={pair[1]}/>}
          />
        );})
    );
  }
}

export default Note;
