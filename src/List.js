import React, { Component } from 'react';

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
          <div key={pair[0]}>
            <li>{pair[1]}</li>
            <button id={pair[0]} onClick={() => this.props.onClick(pair[0])}>Delete</button>
          </div>
        );})
      }
      </ol>
    )
  }
}

export default List;
