import React, { Component } from 'react'
import axios from 'axios'
export default class CategoryTable extends Component {

    constructor() {
        super();
        this.state = {
            subcategories: []
        }
    }

    async componentDidMount() {

        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        const res3 = await axios.get('http://167.99.15.83:4000/api/categories/categories_childs/' + this.props.idCat);
        this.setState({ subcategories: res3.data.clasificaciones });
    }
    render() {
        return (
            <div>
                <br /><hr />
                {/* Hover table card start */}
                <div className="card">
                    <div className="card-header">
                        <h4>Sub-Categorias de {this.props.nameCat} </h4>
                        <div><button type="button" className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger" data-modal="modal-13"> <i className="icofont icofont-plus m-r-5" />Nueva Sub-Categoría </button></div>
                    </div>
                    <div className="card-block table-border-style mt-3">
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

                                    {this.state.subcategories.map(subCat =>
                                        <tr>
                                            <td >{subCat.code}</td>
                                            <td >{subCat.name}</td>
                                            <td >{subCat.description}</td>
                                            <td className="action-icon">
                                                <a href="#!" className="m-r-15 text-muted" data-toggle="tooltip" data-placement="top" title data-original-title="Edit"><i className="icofont icofont-ui-edit" /></a>
                                                <a href="#!" className="text-muted" data-toggle="tooltip" data-placement="top" title data-original-title="Delete"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
