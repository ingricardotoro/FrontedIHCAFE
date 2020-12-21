import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

export default class ReportsUsers extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            cont: 1
        };
    }
    async componentDidMount() {

        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }
        //traemos todo los usuario registrados
        const res = await axios.get("http://167.99.15.83/api/users/");
        this.setState({ users: res.data.users });
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
                                        <button className="btn btn-block btn-success" onClick={() => exportTableToExcel('users_reports', 'Reporte de Usuarios')} type="primary">Exportar en Excel </button>
                                    </div>
                                    <div className="page-header-breadcrumb">
                                        <ul className="breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="icofont icofont-home" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item"><Link to={'/reports'} >Reportes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Page-header end */}
                                {/* Page-body start */}
                                <div className="page-body">
                                    <div className="card product-add-modal">
                                        <div className="card-header">
                                            <h5>Reporte de usuarios</h5>

                                        </div>
                                        <div className="card-block">
                                            <div className="table-content crm-table">
                                                <div className="project-table">
                                                    <table style={{ border: '1px solid' }} id="users_reports" className="table table-striped nowrap">
                                                        <thead>
                                                            <tr style={{ border: '1px solid' }}>

                                                                <th>Nombre</th>
                                                                <th>Apellido</th>
                                                                <th>Usuario</th>
                                                                <th>Tipo de usuario</th>
                                                                <th>Fecha de Creación</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.users.map((user) => (
                                                                <tr style={{ border: '1px solid' }}>
                                                                    <td>{user.name} </td>
                                                                    <td>{user.lastname}</td>
                                                                    <td>{user.username}</td>
                                                                    <td>{user.tipouser.tipo_user}</td>
                                                                    <td>{user.createdAt}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Container-fluid ends */}
                                </div>
                                {/* Page-body end */}
                            </div>
                        </div>
                        {/* Warning Section Starts */}
                        <div id="styleSelector">
                        </div>
                    </div>
                </div>

            </div >

        )
    }
}

function exportTableToExcel(tableID, filename = '') {

    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}
