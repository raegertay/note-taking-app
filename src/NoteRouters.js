import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Note from './Note';

const NoteRouters = (props) => (
    props.notes.map((note) => { return (
      <Route
      path={`/${note['id']}`}
      key={note['id']}
      render={()=> <Note
        onDeleteClick={() => props.onDeleteClick(note['id'])}
        onEditClick={() => props.onEditClick(note['id'])}
        note={note}/>}
      />
    );})
)

// props => {...props}

export default NoteRouters;
