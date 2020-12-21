import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Coinlist extends Component {

    constructor() {
        super();
        this.state = {
            coins: [],
        }
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        const res = await axios.get('http://167.99.15.83/api/coins/');
        this.setState({ coins: res.data.coins });
    }

    onSubmitDelete = async (id) => {
        const res_p = await axios.post(
            "http://167.99.15.83/api/coins/delete/" + id
        );
        window.location.href = "/accounts";

        if (res_p) {
        }
    };

    render() {
        return (

            <div>
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        {/* Main-body start */}
                        <div className="main-body">
                            <div className="page-wrapper">
                                {/* Page header start */}
                                <div className="page-header page-wrapper">
                                    <div className="page-header-title">
                                        <h4>Gestión de Monedas</h4>
                                    </div>

                                </div>
                                {/* Page header start */}
                                {/* Page body start */}
                                <div className="page-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            {/* Product list card start */}
                                            <div className="card product-add-modal">
                                                <div className="card-header">
                                                    <h5>Catalóogo de Monedas</h5>


                                                    <div className="product-add-modal">
                                                        {/* <button type="button" className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" data-toggle="modal" data-target="#modal-13"> <i className="icofont icofont-plus m-r-5" /> Nuevo Producto
                                                        </button>   */}
                                                        <Link to={'/coin_new'} > <button type="button" className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" > <i className="icofont icofont-plus m-r-5" /> Nueva Moneda
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        {/* Modal static*/}

                                                    </div>

                                                </div>
                                                <div className="card-block">
                                                    <div className="table-responsive">
                                                        <div className="table-content">
                                                            <div className="dt-responsive table-responsive">
                                                                <table id="e-product-list" className="table table-striped table-bordered nowrap">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Imagen</th>
                                                                            <th>Nombre</th>
                                                                            <th>Code</th>
                                                                            <th>Descripción</th>
                                                                            <th>Valor en Fecha</th>
                                                                            <th>Eliminar</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.coins.map(coin =>
                                                                            <tr key={coin.id}>
                                                                                <td className="pro-list-img">
                                                                                    <img width="80px" src={"assets/images/moneda/moneda2.jpg"} className="img-fluid" alt="tbl" />
                                                                                </td>
                                                                                <td>{coin.name}</td>
                                                                                <td>{coin.code}</td>
                                                                                <td>{coin.description}</td>
                                                                                <td> <Link to={'/conversions/' + coin.id} ><button type="button" className="btn btn-primary waves-effect" >Ver Valores</button></Link></td>
                                                                                <td><button type="button" data-toggle="modal" data-target={"#modal_delete_" + coin.id} className="btn btn-danger waves-effect" >Eliminar</button></td>

                                                                                {/* INICIO Modal DELETE*/}

                                                                                < div
                                                                                    className="modal fade"
                                                                                    id={"modal_delete_" + coin.id}
                                                                                    tabIndex={- 1}
                                                                                    role="dialog"
                                                                                >
                                                                                    <div
                                                                                        className="modal-dialog modal-lg"
                                                                                        role="document"
                                                                                    >
                                                                                        <div className="modal-content">
                                                                                            <div className="modal-header">
                                                                                                <h4 className="modal-title">
                                                                                                    Eliminar Modeda:{" "}
                                                                                                    {coin.name}{" "}
                                                                                                </h4>
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="close"
                                                                                                    data-dismiss="modal"
                                                                                                    aria-label="Close"
                                                                                                >
                                                                                                    <span aria-hidden="true">×</span>
                                                                                                </button>
                                                                                            </div>
                                                                                            <div className="modal-body">
                                                                                                <form
                                                                                                    onSubmit={() =>
                                                                                                        this.onSubmitDelete(
                                                                                                            coin.id
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    <div
                                                                                                        style={{
                                                                                                            width: "100%",
                                                                                                            textAlign: "center",
                                                                                                            display: "inline-block",
                                                                                                        }}
                                                                                                    >
                                                                                                        <button
                                                                                                            type="submit"
                                                                                                            className="btn btn-danger waves-effect "
                                                                                                        >
                                                                                                            Eliminar Esta Moneda
                </button>
                                                                                                    </div>
                                                                                                </form>

                                                                                                <div className="modal-footer">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-default waves-effect "
                                                                                                        data-dismiss="modal"
                                                                                                    >
                                                                                                        Cerrar
                </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                { /*FIN Modal DELETE*/}

                                                                            </tr>


                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* Product list card end */}
                                        </div>
                                    </div>
                                </div>
                                {/* Page body end */}
                            </div>
                        </div>
                        {/* Main-body end */}
                        <div id="styleSelector">
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}
