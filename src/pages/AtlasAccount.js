import React, { Component } from 'react'
import axios from 'axios'
import AtlasSubAccount from '../components/AtlasSubAccount'

export default class Atlas extends Component {

    constructor() {
        super();
        this.state = {
            atlas_accounts: [],
        }
    }

    async componentDidMount() {

        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        const res = await axios.get('https://backendihcafe.herokuapp.com/api/atlas/accounts');
        this.setState({ atlas_accounts: res.data.atlas_accounts });
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
                                        <h4>Gestión de Cuentas ATLAS</h4>
                                        <span>Control y Administración de las Cuentas ATLAS</span>
                                    </div>
                                    <div className="page-header-breadcrumb">
                                        <ul className="breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="icofont icofont-home" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item"><a href="#!">ATLAS</a>
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
                                            <h4>Listado de las Cuentas ATLAS</h4>
                                            <div><button type="button" className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger" data-modal="modal-13"> <i className="icofont icofont-plus m-r-5" />Crear Nueva Cuenta </button></div>
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
                                                            <th>Nombre Corto</th>
                                                            <th>Descripción</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {this.state.atlas_accounts.map(result =>
                                                            <tr>
                                                                <td >{result.code}</td>
                                                                <td >{result.name}</td>
                                                                <td style={{ whiteSpace: 'normal' }} >{result.details}</td>
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

                                        {this.state.atlas_accounts.map(result2 =>

                                            <AtlasSubAccount className="mt-3" codeResultado={result2.id} nameResultado={result2.name} />

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
