import React, { Component } from 'react'
import axios from 'axios'
import AtlasActividades from './AtlasActividades'
export default class ResultadosAtlas extends Component {

     constructor() {
        super();
        this.state = {
            productos_atlas:[]
        }
    }
    
    async componentDidMount(){

        const res3 = await axios.get('https://backendihcafe.herokuapp.com/api/atlas/productos/'+this.props.codeResultado);
        this.setState({productos_atlas:res3.data.productos_atlas});
    }
    render() {
        return (
            <div>
                <br/><hr/>
                    {/* Hover table card start */}
                    <div className="card">
                        <div className="card-header">
                            <h4>Productos del Resultado({this.props.codeResultado}):  {this.props.nameResultado} </h4>
                            <div><button type="button" className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger" data-modal="modal-13"> <i className="icofont icofont-plus m-r-5" />Nueva Sub-Categoría </button></div>
                        </div>
                        <div  className="card-block table-border-style">
                                <div className="table-responsive">
                                    <table className="table table-hover ">
                                    <thead>
                                        <tr>
                                        <th>Código</th>
                                        <th>Nombre Corto</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.productos_atlas.map(Producto => 
                                            <tr>
                                                <td >{Producto.code}</td>
                                                <td >{Producto.name}</td>
                                                <td style={{whiteSpace:'normal'}} >{Producto.details}</td>
                                                <td  className="action-icon"> 
                                                    <a href="#!" className="m-r-15 text-muted" data-toggle="tooltip" data-placement="top" title data-original-title="Edit"><i className="icofont icofont-ui-edit" /></a>
                                                    <a href="#!" className="text-muted" data-toggle="tooltip" data-placement="top" title data-original-title="Delete"><i className="icofont icofont-delete-alt" /></a>
                                                </td>
                                            </tr>
                                        )}
                                        
                                    </tbody>
                                    </table>
                                </div>
                                </div>

                                {this.state.productos_atlas.map(result => 
                                   
                                   <AtlasActividades className="mt-3" codeResultado={result.code} nameResultado={result.name} />
                                   
                               )}
                    </div>
            </div>
        )
    }
}
