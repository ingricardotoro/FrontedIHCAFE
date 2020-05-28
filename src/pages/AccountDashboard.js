import React, { Component } from 'react'
import TableAccount from '../components/TableAccount'
import { Link } from 'react-router-dom'

export default class ProjectDashboard extends Component {

    componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }
    }

    render() {

        return (
            <div>
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        <div className="main-body">
                            <div className="page-wrapper">
                                <div className="page-header page-wrapper">
                                    <div className="page-header-title">
                                        <h4>Historial de Cuenta</h4>
                                        <span>Descripcción de los movimientos Financieros.</span>
                                    </div>
                                    <div className="page-header-breadcrumb">
                                        <ul className="breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="icofont icofont-home"></i>
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item"><Link to={'/accounts'}>Cuentas</Link>
                                            </li>
                                            <li className="breadcrumb-item">Historial
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <TableAccount idAccount={this.props.match.params.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
