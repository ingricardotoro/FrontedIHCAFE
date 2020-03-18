import React, { Component } from 'react'

export default class BudgetNew extends Component {
    render() {
        return (
            <div className="pcoded-content">
            <div className="pcoded-inner-content">

                <div className="main-body">
                    <div className="page-wrapper">
                        <div className="page-header page-wrapper mt-3 ">
                            <div className="page-header-title">
                                <h4>Crear un nuevo Presupuesto</h4>
                                <span>Creación de Nuevos Ejercicios Presupuestales</span>
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
                                                
                                                <form>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Código de Identificación</label>
                                                    <div className="col-sm-10">
                                                    <input type="text" className="form-control" placeholder="Código del Presupuesto" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Nombre del Presupuesto</label>
                                                    <div className="col-sm-10">
                                                    <input required type="text" className="form-control" placeholder="Ingrese un Nombre" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Descripción del Presupuesto</label>
                                                    <div className="col-sm-10">
                                                    <textarea rows={5} cols={5} className="form-control" placeholder="Default textarea" defaultValue={""} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Fecha de Inicio</label>
                                                    <div className="col-sm-10">
                                                        <input class="form-control" type="date" placeholder="Inicio del ejercicio presupuestal" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Fecha de Finalización</label>
                                                    <div className="col-sm-10">
                                                        <input class="form-control" type="date" placeholder="Fin del ejercicio presupuestal" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Cuenta de Presupuesto</label>
                                                    <div className="col-sm-10">
                                                    <select name="select" className="form-control">
                                                        <option value="opt1">Selecione Cuenta</option>
                                                        <option value="opt2">Banco occidente 2253 (Dolar)</option>
                                                        <option value="opt3">Banco Rural 21212-1 (LPS)</option>
                                                        <option value="opt4">Cuenta de Cheues IHCAFE (LPS)</option>
                                                    </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-lg-2 col-form-label">Presupuesto Inicial</label>
                                                    <div className="col-sm-8 col-lg-10">
                                                        <div className="input-group">
                                                        <span className="input-group-addon" id="basic-addon1">$</span>
                                                        <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Estado del Presupuesto</label>
                                                    <div className="col-sm-10">
                                                    <select name="select" className="form-control">
                                                        <option value="opt1">Selecione Estado</option>
                                                        <option value="opt2">Aprobado</option>
                                                        <option value="opt3">En espera</option>
                                                    </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-lg-2 col-form-label">Guardar Presupuesto</label>
                                                    <div className="col-sm-8 col-lg-10">
                                                        <div className="input-group">
                                                        <input type="submit" className="btn btn-lg btn-success" />
                                                        </div>
                                                    </div>
                                                </div>
                                              
                                                </form>
                                               
                                            </div>
                                            </div>
                                        <p />

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
