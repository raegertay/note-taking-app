import React, { Component } from 'react';

class Note extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.note[0]}</h1>
        <p>{this.props.note[1]}</p>
        <button onClick={() => this.props.onEditClick()}>Edit</button>
        <br /><br />
        <button onClick={() => this.props.onDeleteClick()}>Delete</button>
      </div>
    );
  }
}


export default Note;
