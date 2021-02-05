import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TabladeProductos from './TabladeProductos'

export default class ReportAtlasByResults extends Component {
    _isMounted_R = true
    constructor() {
        super()

        this.state = {
            ArrayResults: [],
            //ArrayProducts: [],
            products: []

        };
    }

    async componentDidMount() {

        this.setState({ ArrayResults: [] })
        this.setState({ ProductS: [] })

        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        //alert("Buscar Resultados Padres")

        /*const res_AR = await axios.get(
            "http://167.99.15.83:4000/api/atlas/resultados/"
        )

        this.setState({ ArrayResults: res_AR.data.atlas_resultados })*/

        fetch('http://167.99.15.83:4000/api/atlas/resultados/')
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                if (this._isMounted_R) {
                    this.setState({ ArrayResults: recurso.atlas_resultados })
                }

                /*this.state.activities.map((A) => (
                    console.log("Activity=" + A.name + " Id=" + A.id + " Code=" + A.code)
                ))*/
            })

        /*this.state.ArrayResults.map((AR) => (
            console.log("ArrayResults=" + AR.name + " ID=" + AR.id + " Code=" + AR.code)
        ))*/
    }

    componentWillUnmount() {
        //alert("Desmontando Resultado")
        this._isMounted_R = false;
    }

    handleSetProducts = (productos) => {
        this.setState({ products: productos })
    }

    /*handleInitialProducts = () => {
        this.setState({ products: [] })
    }*/

    /*async buscarProductos(code_resultado) {

        const res = await axios.get(
            "http://167.99.15.83:4000/api/atlas/productos/" + code_resultado
        )

        this.setState({ ArrayProducts: res.data.productos_atlas })

    }*/

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

    /*createKey() {
        const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let newkey = ""
        for (let i = 0; i < 10; i++) {

            //newkey += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33)
            newkey += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log("NewKey=" + newkey)
        return newkey
    }*/

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
                                            <h5>Reporte Atlas por Resultados</h5>

                                        </div>
                                        <div className="card-block">
                                            <div className="table-content crm-table">
                                                <div className="project-table">
                                                    <table id="report" className="table table-striped ">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ border: '1px solid', width: '200px' }}>Resultados</th>
                                                                <th style={{ border: '1px solid' }}>Productos / Actividades</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                this.state.ArrayResults.map((Item) => (
                                                                    <tr key={Item.id} style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                        <td style={{ border: '1px solid', whiteSpace: 'normal' }}>{Item.code}-{Item.details} </td>
                                                                        <td style={{ border: '1px solid', whiteSpace: 'normal' }}>

                                                                            {<TabladeProductos
                                                                                key={Item.id}
                                                                                code_resultado={Item.code}
                                                                                handleSetProducts={this.handleSetProducts}
                                                                                budget_atlas_id={this.props.match.params.budget_atlas_id}
                                                                            />}

                                                                        </td>
                                                                    </tr>

                                                                ))
                                                            }
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

