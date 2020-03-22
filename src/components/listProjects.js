import React, { Component } from 'react'
import axios from 'axios'

export default class listProjects extends Component {

    state = {
        projects:[]
    }

    async componentDidMount(){
      const res = await axios.get('localhost:4000/api/projects/');
      this.setState({projects:res.data.projects});
      //console.log(res.data.projects)
      //console.log(this.state.projects);
    }

    render() {
        return (
            <div>
                Listado de Projectos
           
                 {
                    this.state.projects.map(project =><p  key={project.id}> {project.code} </p>)
                 }
                 
            
         </div>
           
        )
    }
}
