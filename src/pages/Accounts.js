import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Account_list extends Component {


    constructor() {
        super();
        this.state = {
            accounts: [],
        }
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        const res = await axios.get('http://190.92.73.69:4000/api/accounts/');
        this.setState({ accounts: res.data.cuentas });
    }

    onSubmitDelete = async (id) => {
        const res_p = await axios.post(
            "http://190.92.73.69:4000/api/accounts/delete/" + id
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
                                        <h4>Gestión de Cuentas</h4>
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
                                                    <h5>Catálogo de Cuentas</h5>


                                                    <div className="product-add-modal">
                                                        {/* <button type="button" className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" data-toggle="modal" data-target="#modal-13"> <i className="icofont icofont-plus m-r-5" /> Nuevo Producto
                                                        </button>   */}
                                                        <Link to={'/account_new'} > <button type="button" className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" > <i className="icofont icofont-plus m-r-5" /> Nueva Cuenta
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
                                                                            <th>Moneda</th>
                                                                            <th>Descripción</th>
                                                                            {/* <th>Balance Actual</th> */}
                                                                            <th>Usuario</th>
                                                                            {/* <th>Historial</th> */}
                                                                            <th>Eliminar</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.accounts.map(account =>
                                                                            <tr key={account.id}>
                                                                                <td className="pro-list-img">
                                                                                    <img width="80px" src={"assets/images/accounts/bank.jpg"} className="img-fluid" alt="tbl" />
                                                                                </td>
                                                                                <td>{account.name}</td>
                                                                                <td>{account.coin.name}</td>
                                                                                <td>{account.description}</td>
                                                                                {/* <td>{this.formatMoney(account.actualbalance)}</td> */}
                                                                                <td>{account.user.name} {account.user.lastname} </td>
                                                                                {/*  <td> <Link to={'/account/' + account.id} ><button type="button" className="btn btn-primary waves-effect" >Ver Historial</button></Link></td>*/}
                                                                                <td><button type="button" data-toggle="modal" data-target={"#modal_delete_" + account.id} className="btn btn-danger waves-effect" >Eliminar</button></td>

                                                                                {/* INICIO Modal DELETE*/}

                                                                                < div
                                                                                    className="modal fade"
                                                                                    id={"modal_delete_" + account.id}
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
                                                                                                    Eliminar Cuenta Monetaria:{" "}
                                                                                                    {account.name}{" "}
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
                                                                                                            account.id
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
                                                                                                            Eliminar Esta Cuenta Monetaria
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
