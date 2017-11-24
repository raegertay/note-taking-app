import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Note from './Note';

const NoteRouters = (props) => (
    props.notes.map((pair) => { return (
      <Route
      path={`/${pair[0]}`}
      render={()=> <Note
        onDeleteClick={() => props.onDeleteClick(pair[0])}
        onEditClick={() => props.onEditClick(pair[0])}
        note={pair[1]}/>}
      />
    );})
)

// props => {...props}

export default NoteRouters;
