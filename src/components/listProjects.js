import React, { Component } from 'react'
import axios from 'axios'

export default class listProjects extends Component {

    state = {
        projects:[]
    }

    async componentDidMount(){
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }
        
<<<<<<< HEAD
      const res = await axios.get('http://localhost:4000/api/projects/');
=======
      const res = await axios.get('http://190.92.73.69:4000/api/projects/');
>>>>>>> e7cd564136482e6217dddf33ebedd39481c9d4a3
      this.setState({projects:res.data.projects});
  
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
