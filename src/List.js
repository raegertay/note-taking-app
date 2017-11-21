import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// const List = (props) => (
//   <ol>
//   {
//     props.items.forEach((item, item_id) => <li key={item_id}>{item}</li>)
//   }
//   </ol>
// )

class List extends Component {
  render() {
    let li_arr = [];
    this.props.items.forEach((term, item_id) => li_arr.push([item_id, term]));
    return (
      <ol>
      {
        li_arr.map((pair) => { return (
            <li key={pair[0]}><Link to={`/${pair[0]}`}>{pair[1]}</Link></li>
        );})
      }
      </ol>
    )
  }
}

export default List;
