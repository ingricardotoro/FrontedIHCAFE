import React, { Component } from 'react';
import axios from 'axios';
import ValorAtlas from './ValorAtlas';
import { API_URL } from '../../../config/api';

export default class ResultadoByProyect extends Component {
  _isMounted_A = true;

  constructor() {
    super();

    this.state = {
      projects: [],
    };
  }

  async componentDidMount() {
    const res_p2 = await axios.post(
      `${API_URL}/projects/findProjectsByBudgetId/${this.props.budget_atlas_id}`
    );
    this.setState({ projects: res_p2.data.projectsbybudgetid });
  }

  render() {
    return (
      <>
        {this.state.projects.map((project) => (
          <>
            <td key={project.id} style={{ border: '1px solid' }}>
              <ValorAtlas
                project_id={project.id}
                code_activity={this.props.activity_code}
              />
            </td>
            <td style={{ border: '1px solid' }}>0</td>
            <td style={{ border: '1px solid' }}>0</td>
          </>
        ))}
      </>
    );
  }
}
