import React, { Component } from 'react'
import axios from 'axios'
export default class ModalVerFiles extends Component {

    constructor() {
        super();
        this.state = {
            files:[],
        }
    }
    
    async componentDidMount(){

        const res_files = await axios.post('http://167.99.15.83:4000/api/files/filesbybudgetid/'+this.props.budgetlineatlas);
        this.setState({files:res_files.data.files});

    }

    render() {
        if (this.state.files) {
                return (
                <div>
                    
                    <div class="modal fade" id={'ver_archivos_'+this.props.budgetlineatlas} tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">{this.props.budgetlineatlasName} </h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body" align="center">
    
                                <div className="row card-block">
                                    <div className="col-md-12">
                                        <ul className="list-view">
                                        {
                                                this.state.files.map(file => 
                                            <li>
                                                <div className="card user-card">
                                                    <div className="card-block">
                                                        <div className="media">
                                                            <a className="media-left" href="#">
                                                                <img style={{width:'200px'}} className="img-thumbnail " src={'http://http://167.99.15.83:4000/'+file.filedir + file.filename} />
                                                            </a>
                                                            <div className="media-body">
                                                                <div className="col-xs-12">
                                                                        <h6 className="d-inline-block">{file.description} </h6>
                                                                        
                                                                </div>
                                                                    <div className="f-13 text-muted m-b-15">{file.fase}</div>
                                                                    <a href = {'http://http://167.99.15.83:4000/'+file.filedir + file.filename}>DESCARGAR </a>
                                                                  
                                                                    
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default waves-effect " data-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                   


                </div>
            )
        }
        else{
            return (
                <div>
                      <div class="modal fade" id={'ver_archivos_'+this.props.budgetlineatlas} tabindex="-1" role="dialog">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h4 class="modal-title">SIN ARCHIVOS INGRESADOS </h4>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body" align="center">
                                                                
                                                               

                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-default waves-effect " data-dismiss="modal">Cerrar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                </div>
            )
        }
       
    }
}
