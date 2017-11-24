import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const NoteList = (props) => {
  let li_arr = [];
  props.items.forEach((note, item_id) => li_arr.push([item_id, note]));
  return (
    <ol>
    {
      li_arr.map((pair) => { return (
          <li key={pair[0]}><Link to={`/${pair[0]}`}>{pair[1][0]}</Link></li>
      );})
    }
    </ol>
  )
}

export default NoteList;
