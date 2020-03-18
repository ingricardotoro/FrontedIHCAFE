import React, { Component } from 'react'
import axios from 'axios'
import CategoryTable from '../components/CategoryTable'
export default class ListCategories extends Component {

    constructor() {
        super();
        this.state = {
            categories_parents:[],
        }
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:4000/api/categories/categories_parents');
        this.setState({categories_parents:res.data.categories});
    }

    render() {
        return (
            <div>
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        {/* Main-body start */}
                        <div className="main-body">
                        <div className="page-wrapper">
                            {/* Page-header start */}
                            <div className="page-header mt-5">
                            <div className="page-header-title">
                                <h4>Gestión de Categorias</h4>
                                <span>Control y Administración de las categorias</span>
                            </div>
                            <div className="page-header-breadcrumb">
                                <ul className="breadcrumb-title">
                                <li className="breadcrumb-item">
                                    <a href="index.html">
                                    <i className="icofont icofont-home" />
                                    </a>
                                </li>
                                <li className="breadcrumb-item"><a href="#!">Categorias</a>
                                </li>
                                <li className="breadcrumb-item"><a href="#!">Listar</a>
                                </li>
                                </ul>
                            </div>
                            </div>
                            {/* Page-header end */}
                            {/* Page-body start */}
                            <div className="page-body">
                           
                          
                            {/* Hover table card start */}
                            <div className="card">
                                <div className="card-header">
                                <h5>Listado de Categorias Principales</h5>
                                <div><button type="button" className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger" data-modal="modal-13"> <i className="icofont icofont-plus m-r-5" />Nueva Categoria Principal </button></div>
                                    <div className="card-header-right">
                                        <i className="icofont icofont-rounded-down" />
                                        <i className="icofont icofont-refresh" />
                                        <i className="icofont icofont-close-circled" />
                                    </div>
                                </div>
                                <div className="card-block table-border-style">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>Código</th>
                                        <th>Categoria</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.categories_parents.map(cat_parent => 
                                            <tr>
                                                <td >{cat_parent.code}</td>
                                                <td >{cat_parent.name}</td>
                                                <td >{cat_parent.description}</td>
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
                                
                                {this.state.categories_parents.map(cat_parent => 
                                   
                                    <CategoryTable className="mt-3" idCat={cat_parent.id} nameCat={cat_parent.name} />
                                    
                                )}

                            </div>
                            {/* Hover table card end */}

                         
                            </div>
                            {/* Page-body end */}
                        </div>
                        </div>
                        {/* Main-body end */}
                        <div id="styleSelector">
                        </div>
                    </div>
                    </div>

            </div>
        )
    }
}
