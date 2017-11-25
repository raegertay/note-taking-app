import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const ProjectLinks = (props) => (
  <ol>
    {
      props.projects.map((project, i) =>
        <li key={i}>
          <Link
            to={`/${project['name']}`}
            onClick={() => props.onProjectClick(project['name'])}>
            {project['name']}
          </Link>
          <button onClick={() => props.onDeleteClick(project['name'])}>Delete
          </button>
        </li>
      )
    }
  </ol>
)


export default ProjectLinks;
