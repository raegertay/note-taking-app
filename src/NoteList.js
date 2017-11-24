import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const NoteList = (props) => (
    <ol>
    {
      props.notes.map((pair) => { return (
          <li key={pair[0]}><Link to={`/${pair[0]}`}>{pair[1][0]}</Link></li>
      );})
    }
    </ol>
  )

export default NoteList;
