import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class TeamNew extends Component {

    constructor() {
        super();
        this.state = {
            description: "",
            name: ""
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

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/teams', {
            description: this.state.description,
            name: this.state.name
        })
        window.location.href = '/teams_list';
    }

    render() {
        return (
            <div className="pcoded-content">
                <div className="pcoded-inner-content">

                    <div className="main-body">
                        <div className="page-wrapper">
                            <div className="page-header page-wrapper mt-3 ">
                                <div className="page-header-title">
                                    <h4>Crear una nuevo Equipo de Trabajo</h4>
                                    <span>Creación de Nuevos Equipos de Trabajo</span>
                                </div>
                                <div className="page-header-breadcrumb">
                                    <ul className="breadcrumb-title">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">
                                                <i className="icofont icofont-home" />
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item"><Link to={'/teams_list'} >Equipos</Link>
                                        </li>
                                        <li className="breadcrumb-item">Crear Nuevo Equipo
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
                                                                <label className="col-sm-2 col-form-label">Nombre de la Cuenta</label>
                                                                <div className="col-sm-10">
                                                                    <input onChange={this.onChangeName} required type="text" className="form-control" placeholder="Ingrese Nombre de Equipo" />
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Descripción de la Cuenta</label>
                                                                <div className="col-sm-10">
                                                                    <textarea onChange={this.onChangeDescription} rows={5} cols={5} className="form-control" placeholder="Descripción del Equipo" defaultValue={""} />
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <label className="col-sm-4 col-lg-2 col-form-label">Creación de Equipo</label>
                                                                <div className="col-sm-8 col-lg-10">
                                                                    <div className="input-group">
                                                                        <button type="submit" className="btn btn-lg btn-success" >Crear Equipo </button>
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
