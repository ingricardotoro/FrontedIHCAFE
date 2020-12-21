import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default class CoinNew extends Component {

    constructor() {
        super();
        this.state = {
            description: "",
            name: "",
            code: "",
        }
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }
    }

    onChangeName = (e) => { this.setState({ name: e.target.value }) }
    onChangeDescription = (e) => { this.setState({ description: e.target.value }) }
    onChangeCode = (e) => { this.setState({ code: e.target.value }) }


    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://167.99.15.83:4000/api/coins/', {
            description: this.state.description,
            name: this.state.name,
            code: this.state.code
        })
        window.location.href = '/coins';
    }

    render() {
        return (
            <div className="pcoded-content">
                <div className="pcoded-inner-content">

                    <div className="main-body">
                        <div className="page-wrapper">
                            <div className="page-header page-wrapper mt-3 ">
                                <div className="page-header-title">
                                    <h4>Crear una Nueva Moneda</h4>
                                    <span>Creación de Nuevas Monedas</span>
                                </div>
                                <div className="page-header-breadcrumb">
                                    <ul className="breadcrumb-title">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">
                                                <i className="icofont icofont-home" />
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item"><Link to={'/coins'} >Monedas</Link>
                                        </li>
                                        <li className="breadcrumb-item">Crear Nueva Moneda
                                </li>
                                    </ul>
                                </div>

                            </div>
                            <div className="page-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>Formulario de Creación</h5>
                                                <span>Ingrese correctamente cada uno de los datos solicitados.</span>
                                                <div className="card-header-right">
                                                    <i className="icofont icofont-rounded-down"></i>
                                                    <i className="icofont icofont-refresh"></i>
                                                    <i className="icofont icofont-close-circled"></i>
                                                </div>
                                            </div>
                                            <div className="card-block">
                                                <div>
                                                    <p>
                                                    </p><div className="card-block">

                                                        <form onSubmit={this.onSubmit} >


                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Nombre de la Moneda</label>
                                                                <div className="col-sm-10">
                                                                    <input onChange={this.onChangeName} required type="text" className="form-control" placeholder="Ingrese Nombre de Moneda" />
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Símbolo de la Moneda</label>
                                                                <div className="col-sm-10">
                                                                    <input onChange={this.onChangeCode} required type="text" className="form-control" placeholder="Ingrese Símbolo de Moneda" />
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Descripción de la Moneda</label>
                                                                <div className="col-sm-10">
                                                                    <textarea onChange={this.onChangeDescription} rows={5} cols={5} className="form-control" placeholder="Descripción de la moneda" defaultValue={""} />
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <label className="col-sm-4 col-lg-2 col-form-label">Guardar Moneda</label>
                                                                <div className="col-sm-8 col-lg-10">
                                                                    <div className="input-group">
                                                                        <button type="submit" className="btn btn-lg btn-success" >Crear Moneda </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="styleSelector">

                    </div>
                </div>
            </div>
        )
    }
}
