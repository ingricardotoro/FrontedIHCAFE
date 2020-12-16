import React, { Component } from 'react'
import axios from 'axios'
export default class AtlasSubAccount extends Component {

    constructor() {
        super();
        this.state = {
            subAccount_atlas: []
        }
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

<<<<<<< HEAD
        const res3 = await axios.get('http://localhost:4000/api/atlas/sub_accounts/' + this.props.codeResultado);
=======
        const res3 = await axios.get('http://190.92.73.69:4000/api/atlas/sub_accounts/' + this.props.codeResultado);
>>>>>>> e7cd564136482e6217dddf33ebedd39481c9d4a3
        this.setState({ subAccount_atlas: res3.data.sub_accounts });
    }
    render() {
        return (
            <div>
                <br /><hr />
                {/* Hover table card start */}
                <div className="card">
                    <div className="card-header">
                        <h4>Sub Cuentas de la Cuenta Atlas: {this.props.nameResultado} </h4>
                        <div><button type="button" className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger" data-modal="modal-13"> <i className="icofont icofont-plus m-r-5" />Nueva Sub-Categoría </button></div>
                    </div>
                    <div className="card-block table-border-style">
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

                                    {this.state.subAccount_atlas.map(SubAccount =>
                                        <tr>
                                            <td >{SubAccount.code}</td>
                                            <td >{SubAccount.name}</td>
                                            <td style={{ whiteSpace: 'normal' }} >{SubAccount.details}</td>
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
