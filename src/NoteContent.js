import React, { Component } from 'react';

// <div key={pair[0]}>
//   <li>{pair[1]}</li>
//   <button onClick={() => this.props.onDeleteClick(pair[0])}>Delete</button>
//   <button onClick={() => this.props.onEditClick(pair[0])}>Edit</button>
// </div>

class NoteContent extends Component {
  render() {
    return (
      <div>
      <h1>{this.props.term}</h1>
      <button onClick={() => this.props.onDeleteClick()}>Delete</button>
      <button onClick={() => this.props.onEditClick()}>Edit</button>
      </div>
    );
  }
}


export default NoteContent;
