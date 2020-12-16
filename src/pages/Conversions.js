import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class TeamMembers extends Component {

    constructor() {
        super();
        this.state = {
            conversions: [],
            coin: [],
            value: 0,
            description: "",
            fechainicial: '',
            fechafinal: '',
        }
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        //obtenemos el id de la moneda que viene por url
        const res = await axios.get('http://localhost:4000/api/coins/' + this.props.match.params.id);
        this.setState({ coin: res.data.coin });

        //obtenemos las conversiones de esta moneda
        const res2 = await axios.get('http://localhost:4000/api/conversions/' + this.state.coin.id);
        this.setState({ conversions: res2.data.conversions });

    }

    onChangeValue = (e) => { this.setState({ value: e.target.value }) }
    onChangeDescription = (e) => { this.setState({ description: e.target.value }) }
    onChangeStartDate = (e) => { this.setState({ fechainicial: e.target.value }) }
    onChangeEndDate = (e) => { this.setState({ fechafinal: e.target.value }) }

    onSubmitDelete = async (id) => {
        const res_p = await axios.post(
            "http://localhost:4000/api/conversions/delete/" + id
        );
        window.location.href = "/conversions/" + this.state.coin.id;

        if (res_p) {
        }
    };

    onSubmitAddValue = async e => {
        //e.preventDefault();
        await axios.post('http://localhost:4000/api/conversions', {
            coin_id: this.state.coin.id,
            description: this.state.description,
            value: this.state.value,
            dateinitial: this.state.fechainicial,
            datefinal: this.state.fechafinal
        })
        window.location.href = '/conversions/' + this.state.coin.id;
    }

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
                                        <h4>Gestión del valor de Moneda</h4>
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
                                                    <h5>Valor de la Moneda: "{this.state.coin.name}"</h5>

                                                    <div className="product-add-modal">

                                                        <button type="button" data-toggle="modal" data-target={"#modal_add_" + this.state.coin.id} className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" > <i className="icofont icofont-plus m-r-5" /> Agregar Nuevo Valor
                                                        </button>

                                                    </div>
                                                    <div>

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
                                                                            <th>Nombre de Moneda</th>
                                                                            <th>Valor</th>
                                                                            <th>Descripcion</th>
                                                                            <th>Inicio</th>
                                                                            <th>Final</th>
                                                                            <th>Eliminar</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.conversions.map(conversion =>
                                                                            <tr key={conversion.id}>
                                                                                <td className="pro-list-img">
                                                                                    <img width="80px" src={"../assets/images/teams/conversion.jpg"} className="img-fluid" alt="tbl" />
                                                                                </td>
                                                                                <td>{this.state.coin.name}</td>
                                                                                <td>{conversion.value} </td>
                                                                                <td>{conversion.description} </td>
                                                                                <td>{conversion.dateinitial}</td>
                                                                                <td>{conversion.datefinal}</td>
                                                                                {/* <td> <Link to={'/teamconversions/' + team.id} ><button type="button" className="btn btn-primary waves-effect" >Ver Miembros</button></Link></td> */}
                                                                                <td><button type="button" data-toggle="modal" data-target={"#modal_delete_" + conversion.id} className="btn btn-danger waves-effect" >Eliminar</button></td>

                                                                                {/* INICIO Modal DELETE*/}

                                                                                < div
                                                                                    className="modal fade"
                                                                                    id={"modal_delete_" + conversion.id}
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
                                                                                                    Eliminar Valor de  moneda:{" "}
                                                                                                    {this.state.coin.name}{" "}
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
                                                                                                            conversion.id
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
                                                                                                            Eliminar Este Valor de Moneda
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
                                                                {/* INICIO Modal Add Member*/}

                                                                < div
                                                                    className="modal fade"
                                                                    id={"modal_add_" + this.state.coin.id}
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
                                                                                    Agergar Nuevo Valor A Moneda:{" "}
                                                                                    {this.state.coin.name}{" "}
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

                                                                                >
                                                                                    <div
                                                                                        style={{
                                                                                            width: "100%",
                                                                                            textAlign: "center",
                                                                                            display: "inline-block",
                                                                                        }}
                                                                                    >


                                                                                        <div className="form-group row">
                                                                                            <label className="col-sm-4 col-form-label">Ingresar Valor en LPS.</label>
                                                                                            <div className="col-sm-6">
                                                                                                <input onChange={this.onChangeValue} required type="text" className="form-control" placeholder="Ingrese Valor de Moneda" />
                                                                                            </div>
                                                                                        </div>

                                                                                        <div style={{ width: "50%", display: "inline-block" }}>
                                                                                            <input
                                                                                                required
                                                                                                onChange={this.onChangeStartDate}
                                                                                                class="form-control mt-3"
                                                                                                type="date"
                                                                                                placeholder="Fecha de Inicio"
                                                                                            />
                                                                                            <label htmlFor="">Fecha de Inicio</label>
                                                                                        </div>
                                                                                        <div style={{ width: "50%", display: "inline-block" }}>
                                                                                            <input
                                                                                                required
                                                                                                onChange={this.onChangeEndDate}
                                                                                                class="form-control mt-3"
                                                                                                type="date"
                                                                                                placeholder="Fecha de Final"
                                                                                            />
                                                                                            <label htmlFor="">Fecha de Finalización</label>
                                                                                        </div>

                                                                                        <div className="form-group row">
                                                                                            <label className="col-sm-2 col-form-label">Descripción del nuevo valor</label>
                                                                                            <div className="col-sm-10">
                                                                                                <textarea onChange={this.onChangeDescription} rows={5} cols={5} className="form-control" placeholder="Descripción de la cuenta" defaultValue={""} />
                                                                                            </div>
                                                                                        </div>

                                                                                        <button
                                                                                            onClick={() => this.onSubmitAddValue()}
                                                                                            type="button"
                                                                                            className="btn btn-success waves-effect "
                                                                                        >
                                                                                            Agregar Nuevo Valor
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

                                                                { /*FIN Modal Add Member*/}
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
