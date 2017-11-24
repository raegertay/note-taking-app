import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const NoteList = (props) => (
    <ol>
    {
      props.notes.map((note) => { return (
          <li key={note['id']}><Link to={`/${note['id']}`}>{note['title']}</Link></li>
      );})
    }
    </ol>
  )

export default NoteList;
