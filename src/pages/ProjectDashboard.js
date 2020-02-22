import React, { Component } from 'react'
import TableCost from '../components/TableCost'
import {Link} from 'react-router-dom'

export default class ProjectDashboard extends Component {

    render() {
      
        return (
            <div>
                 <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        <div className="main-body">
                            <div className="page-wrapper">
                                <div className="page-header page-wrapper">
                                    <div className="page-header-title">
                                        <h4>Renglones Presupuestarios</h4>
                                        <span>Descripcción de los costos y gastos.</span>
                                    </div>
                                    <div className="page-header-breadcrumb">
                                        <ul className="breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="icofont icofont-home"></i>
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item"><Link to={'/budgets' }>Presupuestos</Link>
                                            </li>
                                            <li className="breadcrumb-item">Renglones
                                            </li>
                                        </ul>
                                    </div>
                                 </div>
                                <TableCost idProject={this.props.match.params.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
