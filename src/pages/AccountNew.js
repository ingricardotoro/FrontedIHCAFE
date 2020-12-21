import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default class AccountNew extends Component {

    constructor() {
        super();
        this.state = {

            description: "",
            name: "",
            coin_id: 0,
            coins: [],
            person_id: 0

        }
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        const token = localStorage.usertoken
        const decode = jwt_decode(token)
        this.setState({
            person_id: decode.id
        })

        const res = await axios.get('http://167.99.15.83:4000/api/coins/');
        this.setState({ coins: res.data.coins });

    }

    onChangeName = (e) => { this.setState({ name: e.target.value }) }
    onChangeDescription = (e) => { this.setState({ description: e.target.value }) }
    onChangeCoin = (e) => { this.setState({ coin_id: e.target.value }) }


    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://167.99.15.83:4000/api/accounts', {
            description: this.state.description,
            name: this.state.name,
            coin_id: this.state.coin_id,
            person_id: this.state.person_id
        })
        window.location.href = '/accounts';
    }

    render() {
        return (
            <div className="pcoded-content">
                <div className="pcoded-inner-content">

                    <div className="main-body">
                        <div className="page-wrapper">
                            <div className="page-header page-wrapper mt-3 ">
                                <div className="page-header-title">
                                    <h4>Crear una nueva cuenta Monetaria</h4>
                                    <span>Creación de Nuevas Cuentas Monetarias</span>
                                </div>
                                <div className="page-header-breadcrumb">
                                    <ul className="breadcrumb-title">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">
                                                <i className="icofont icofont-home" />
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item"><Link to={'/accounts'} >Cuentas</Link>
                                        </li>
                                        <li className="breadcrumb-item">Crear Nueva Cuenta
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
                                                                    <input onChange={this.onChangeName} required type="text" className="form-control" placeholder="Ingrese Nombre de cuenta" />
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Descripción de la Cuenta</label>
                                                                <div className="col-sm-10">
                                                                    <textarea onChange={this.onChangeDescription} rows={5} cols={5} className="form-control" placeholder="Descripción de la cuenta" defaultValue={""} />
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Moneda a utilizar</label>
                                                                <div className="col-sm-10">
                                                                    <select onChange={this.onChangeCoin} name="select" className="form-control">
                                                                        <option value="#">Seleccione Moneda</option>
                                                                        {
                                                                            this.state.coins.map(coin =>
                                                                                <option key={coin.id} value={coin.id}>{coin.name} </option>
                                                                            )
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <label className="col-sm-4 col-lg-2 col-form-label">Guardar Presupuesto</label>
                                                                <div className="col-sm-8 col-lg-10">
                                                                    <div className="input-group">
                                                                        <button type="submit" className="btn btn-lg btn-success" >Crear Cuenta </button>
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
