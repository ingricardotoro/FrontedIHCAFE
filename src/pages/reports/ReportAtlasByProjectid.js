import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

export default class ReportAtlasByProjectid extends Component {

    constructor() {
        super();
        this.state = {
            ArrayReportebyProject: [],
            total_ejecutado: 0,
            total_solicitado: 0
        };
    }

    async componentDidMount() {

        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        const res = await axios.post(
            "http://167.99.15.83:4000/api/budgetlines/atlas/reporte_atlas_by_project/" + this.props.match.params.id
        );

        this.setState({ ArrayReportebyProject: res.data.ArrayReportebyProject });

        //recorremos todos los gastos de este proyecto
        /*Object.keys(this.state.budgetLinesAtlas).map((budg_line) => {
            if (budg_line === "Aprobado") {
                this.state.total_ejecutado += this.state.budg_line.balance;

            }
        })*/

    }

    formatMoney(number) {
        if (this.props.match.params.coin_id == 1) {
            return number.toLocaleString("en-US", {
                style: "currency",
                currency: "HNL",
            });
        }

        if (this.props.match.params.coin_id == 2) {
            return number.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        }
        //return number;
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
                                        <button className="btn btn-block btn-success" onClick={() => exportTableToExcel('report', 'Reporte por Proyecto')} type="primary">Exportar en Excel </button>
                                    </div>
                                    <div className="page-header-breadcrumb">
                                        <ul className="breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="icofont icofont-home" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item"><Link to={'/reports_atlas'} >Volver a Reportes</Link>
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
                                                    <table id="report" className="table table-striped nowrap">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ border: '1px solid' }}>Código</th>
                                                                <th style={{ border: '1px solid' }}>Nombre de Cuenta</th>
                                                                <th style={{ border: '1px solid' }}>Aprobado</th>
                                                                <th style={{ border: '1px solid' }}>Ejecutado</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.ArrayReportebyProject.map((Item) => (
                                                                <tr key={Item.id} style={{ border: '1px solid' }}>
                                                                    <td style={{ border: '1px solid' }}>{Item.atlas_account.code} </td>
                                                                    <td style={{ border: '1px solid' }}>{Item.atlas_account.name}</td>
                                                                    <td style={{ border: '1px solid' }}>{this.formatMoney(Item.inicial)}</td>
                                                                    <td style={{ border: '1px solid' }}>{this.formatMoney(Item.TOTAL)}</td>
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

