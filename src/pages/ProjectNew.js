import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default class ProjectNew extends Component {

    constructor() {
        super();
        this.state = {

            code: "",
            name: "",
            location: "",
            description: "",
            priority: "",
            startdate: "",
            enddate: "",
            budget_id: 0,
            team_id: 0,
            monto: 0,
            status: "",

            budgets: [],
            teams: [],
        }
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        const res = await axios.get('http://localhost:4000/api/budgets/');
        this.setState({ budgets: res.data.budgets });

        const res2 = await axios.get('http://localhost:4000/api/teams/');
        this.setState({ teams: res2.data.teams });
    }

    onChangeCode = (e) => { this.setState({ code: e.target.value }) }
    onChangeName = (e) => { this.setState({ name: e.target.value }) }
    onChangeUbicacion = (e) => { this.setState({ location: e.target.value }) }
    onChangeDescription = (e) => { this.setState({ description: e.target.value }) }
    onChangePriority = (e) => { this.setState({ priority: e.target.value }) }
    onChangeStartDate = (e) => { this.setState({ startdate: e.target.value }) }
    onChangeEndDate = (e) => { this.setState({ enddate: e.target.value }) }
    onChangeBudget = (e) => { this.setState({ budget_id: e.target.value }) }
    onChangeTeam = (e) => { this.setState({ team_id: e.target.value }) }
    onChangeStatus = (e) => { this.setState({ status: e.target.value }) }
    onChangeMonto = (e) => { this.setState({ monto: e.target.value }) }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/projects', {
            code: this.state.code,
            name: this.state.name,
            budgetstart: this.state.monto,
            location: this.state.location,
            description: this.state.description,
            priority: this.state.priority,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            budget_id: this.state.budget_id,
            team_id: this.state.team_id,
            status: this.state.status
        })
        //window.location.href = 'https://ihcafe-35ae7.firebaseapp.com/projects'
        window.location.href = '/budgets';
        //return <Redirect to={"/projects"}  />
    }

    render() {
        return (
            <div className="pcoded-content">
                <div className="pcoded-inner-content">

                    <div className="main-body">
                        <div className="page-wrapper">
                            <div className="page-header page-wrapper mt-3 ">
                                <div className="page-header-title">
                                    <h4>Crear un nuevo Proyecto</h4>
                                    <span>Creación de Nuevos Controles de Proyectos</span>
                                </div>
                                <div className="page-header-breadcrumb">
                                    <ul className="breadcrumb-title">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">
                                                <i className="icofont icofont-home" />
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item"><Link to={'/budgets'} >Presupuestos</Link>
                                        </li>
                                        <li className="breadcrumb-item">Crear Nuevo
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
                                                                <label className="col-sm-2 col-form-label">Código de Identificación</label>
                                                                <div className="col-sm-10">
                                                                    <input onChange={this.onChangeCode} type="text" className="form-control" placeholder="Código del Proyecto" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Nombre del Proyecto</label>
                                                                <div className="col-sm-10">
                                                                    <input onChange={this.onChangeName} required type="text" className="form-control" placeholder="Ingrese un Nombre al Proyecto" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Ubicación del Proyecto</label>
                                                                <div className="col-sm-10">
                                                                    <input onChange={this.onChangeUbicacion} required type="text" className="form-control" placeholder="Ingrese la ubicación al Proyecto" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Descripción del Proyecto</label>
                                                                <div className="col-sm-10">
                                                                    <textarea onChange={this.onChangeDescription} rows={5} cols={5} className="form-control" placeholder="Default textarea" defaultValue={""} />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Presupuesto Aprobado del Proyecto</label>
                                                                <div className="col-sm-10">
                                                                    <input onChange={this.onChangeMonto} required type="text" className="form-control" placeholder="Ingrese el Presupuesto Aprobado para este Proyecto" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Prioridad del Proyecto</label>
                                                                <div className="col-sm-10">
                                                                    <select onChange={this.onChangePriority} name="select" className="form-control">
                                                                        <option value="#">Seleccione Prioridad</option>
                                                                        <option value="Alta">Prioridad Alta</option>
                                                                        <option value="Media">Prioridad Media</option>
                                                                        <option value="Baja">Prioridad Baja</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Presupuesto al que pertenece</label>
                                                                <div className="col-sm-10">
                                                                    <select onChange={this.onChangeBudget} name="select" className="form-control">
                                                                        <option value="#">Seleccione Presupuesto</option>
                                                                        {
                                                                            this.state.budgets.map(budget =>

                                                                                <option key={budget.id} value={budget.id}>{budget.name} </option>

                                                                            )
                                                                        }

                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Equipo de trabajo para Proyecto</label>
                                                                <div className="col-sm-10">
                                                                    <select onChange={this.onChangeTeam} name="select" className="form-control">
                                                                        <option value="#">Seleccione Equipo de trabajo</option>
                                                                        {
                                                                            this.state.teams.map(team =>

                                                                                <option key={team.id} value={team.id}>{team.name} </option>

                                                                            )
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Fecha de Inicio</label>
                                                                <div className="col-sm-10">
                                                                    <input onChange={this.onChangeStartDate} class="form-control" type="date" placeholder="Inicio del Proyecto" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Fecha de Finalización</label>
                                                                <div className="col-sm-10">
                                                                    <input onChange={this.onChangeEndDate} class="form-control" type="date" placeholder="Fin del Proyecto" />
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Estado del Presupuesto</label>
                                                                <div className="col-sm-10">
                                                                    <select onChange={this.onChangeStatus} name="select" className="form-control">
                                                                        <option value="#">Selecione Estado</option>
                                                                        <option value="Aprobado">Aprobado</option>
                                                                        <option value="En Espera">En espera</option>
                                                                        <option value="Iniciado">Iniciado</option>
                                                                        <option value="Finalizado">Finalizado</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <label className="col-sm-4 col-lg-2 col-form-label">Guardar Presupuesto</label>
                                                                <div className="col-sm-8 col-lg-10">
                                                                    <div className="input-group">
                                                                        <button type="submit" className="btn btn-lg btn-success" >Guardar Proyecto </button>
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
