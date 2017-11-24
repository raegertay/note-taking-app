import React, { Component } from 'react';

const Note = (props) => (
    <div>
      <h1>{props.note[0]}</h1>
      <p>{props.note[1]}</p>
      <button onClick={() => props.onEditClick()}>Edit</button>
      <br /><br />
      <button onClick={() => props.onDeleteClick()}>Delete</button>
    </div>
)

export default Note;
