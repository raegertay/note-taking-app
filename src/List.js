import React, { Component } from 'react';

const List = (props) => (
  <ol>
    {
      props.items.map(item => <li>{item}</li>)
    }
  </ol>
)

export default List;
