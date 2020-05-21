import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../components/UserFunctions'

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            usuario: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            username: this.state.usuario,
            password: this.state.password
        }

        login(user).then(res => {
            if (res) {
                window.location.href = "/budgets"
                //this.props.history.push('/budgets')
            }
        })
    }


    render() {
        return (
            <div>

                <div className="pcoded-inner-content">
                    {/* Main-body start */}
                    <div className="main-body">
                        <div className="page-wrapper">
                            {/* Page-header start */}
                            <div className="page-header mt-5">
                                <div className="page-header-title">
                                    <h4>Acceso Al Sistema</h4>
                                </div>
                                <div className="page-header-breadcrumb">
                                    <ul className="breadcrumb-title">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">
                                                <i className="icofont icofont-home" />
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Page-header end */}
                            {/* Page-body start */}
                            <div className="page-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>Formulario de ingreso</h5>
                                                <span>Ingrese sus nombre de usuario y contraseña</span>

                                            </div>
                                            <div className="card-block" style={{ width: 500, margin: "auto" }} >
                                                <div className="j-wrapper j-wrapper-400">
                                                    <form onSubmit={this.onSubmit} className="form-control">

                                                        <div align="center" style={{ padding: 5 }} ><h4>Ingreso al sistema</h4></div>
                                                        <div align="center" style={{ padding: 5 }} >
                                                            <i
                                                                className=" icofont icofont-lock icofont-5x"

                                                            ></i>
                                                        </div>
                                                        <div className="input-group">
                                                            <span
                                                                className="input-group-addon icofont icofont-ui-user"
                                                                id="basic-addon1"

                                                            ></span>
                                                            <input
                                                                onChange={this.onChange}
                                                                type="text"
                                                                className="form-control"
                                                                name="usuario"
                                                                placeholder="Ingrese usuario"
                                                            />
                                                        </div>

                                                        <div className="input-group">
                                                            <span
                                                                className="input-group-addon icofont icofont-lock"
                                                                id="basic-addon1"

                                                            ></span>
                                                            <input
                                                                onChange={this.onChange}
                                                                type="password"
                                                                className="form-control"
                                                                name="password"
                                                                placeholder="Ingrese Contraseña"
                                                            />
                                                        </div>

                                                        <div align="center" className="j-footer">
                                                            <button type="submit" className="btn btn-primary">Ingresar</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Page-body end */}
                            </div>
                        </div>
                        {/* Warning Section Starts */}

                    </div>
                </div>


            </div >

        )
    }
}

