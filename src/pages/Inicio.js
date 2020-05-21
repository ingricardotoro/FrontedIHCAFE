import React, { Component } from 'react'
import { Link } from "react-router-dom";
class Inicio extends Component {
    render() {
        return (
            <div style={{ paddingTop: 30 }} className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Bienvenido Al Sistema de Presupuestos de IHCAFE</h1>

                        <img style={{ paddingTop: 30 }} className="img-fluid" src="/assets/images/ihcafe.PNG" alt="Theme-Logo" />
                        <div style={{ paddingTop: 60, paddingBottom: 30 }} align='center'>


                            <button className="btn btn-block btn-primary">
                                <Link to="login">
                                    <h4 style={{ color: '#fff' }}>Ingresar</h4>
                                </Link>
                            </button>
                        </div>


                    </div>
                </div>
            </div >
        )
    }
}

export default Inicio
