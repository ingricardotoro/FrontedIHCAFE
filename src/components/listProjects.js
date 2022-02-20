import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

export default class listProjects extends Component {
  state = {
    projects: [],
  };

  async componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = '/';
    }

    const res = await axios.get(`${API_URL}/projects/`);
    this.setState({ projects: res.data.projects });
  }

  render() {
    return (
      <div>
        Listado de Projectos
        {this.state.projects.map((project) => (
          <p key={project.id}> {project.code} </p>
        ))}
      </div>
    );
  }
}
