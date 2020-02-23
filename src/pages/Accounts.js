import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Account_list extends Component {

    
    constructor() {
        super();
        this.state = {
            accounts:[],
        }
    }

    async componentDidMount(){
        const res = await axios.get('https://backendihcafe.herokuapp.com/api/accounts/');
        this.setState({accounts:res.data.cuentas});
    }

    formatMoney(number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'HNL' });
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
                                    <h5>Catalóogo de Cuentas</h5>


                                    <div className="product-add-modal">
                                        {/* <button type="button" className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" data-toggle="modal" data-target="#modal-13"> <i className="icofont icofont-plus m-r-5" /> Nuevo Producto
                                        </button>   */}
                                        <Link to={'/account_new'} > <button  type="button" className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" > <i className="icofont icofont-plus m-r-5" /> Nueva Cuenta
                                        </button>  </Link>                                     
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
                                                <th>descripción</th>
                                                <th>Balance Actual</th>
                                                <th>Usuario</th>
                                                <th>Historial</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            {this.state.accounts.map(account => 
                           
                                            
                                                <tr>
                                                    <td className="pro-list-img">
                                                        <img width="80px" src={"assets/images/accounts/"+account.id+".png"} className="img-fluid" alt="tbl" />
                                                    </td>
                                                    <td>{account.name}</td>
                                                    <td>{account.coin}</td>
                                                    <td>{account.description}</td>
                                                    <td>{this.formatMoney(account.actualbalance)}</td>
                                                    <td>Admin</td>
                                                                                                
                                                    <td> <Link to={'/account/'+account.id} ><button type="button" class="btn btn-primary waves-effect" >Ver Historial</button></Link></td>
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

            </div>
         )
    }
}
