import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class BudgetNew extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      name: "",
      tipo: "",
      coin_id: 0,
      description: "",
      excercise_start: "",
      excercise_end: "",
      account_id: 0,
      person_id: 1,
      buddgetstart: 0.0,
      buddgeupdate: 0.0,
      buddgetfinal: 0.0,
      balance: 0.0,
      returns: 0.0,
      deviation: 0.0,
      status: true,
      approval: true,
      approvalby_id: 1,
      dateapproval: Date.now(),

      cuentas: [],
      coins: [],
    };
  }

  async componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = "/"
    }

    const res6 = await axios.get("http://167.99.15.83:4000/api/accounts/");
    this.setState({ cuentas: res6.data.cuentas });

    const res7 = await axios.get("http://167.99.15.83:4000/api/coins/");
    this.setState({ coins: res7.data.coins });
  }
  onChangeBudgetstart = (e) => {
    this.setState({ buddgetstart: e.target.value });
  };
  onChangeCode = (e) => {
    this.setState({ code: e.target.value });
  };

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  onChangedescription = (e) => {
    this.setState({ description: e.target.value });
  };
  onChangeStart = (e) => {
    this.setState({ excercise_start: e.target.value });
  };
  onChangeEnd = (e) => {
    this.setState({ excercise_end: e.target.value });
  };
  onChangeAccount = (e) => {
    this.setState({ account_id: e.target.value });
  };
  onChangeEstado = (e) => {
    this.setState({ status: e.target.value });
  };
  onChangeTipo = (e) => {
    this.setState({ tipo: e.target.value });
  };
  onChangeCoin = (e) => {
    this.setState({ coin_id: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://167.99.15.83:4000/api/budgets", {
      code: this.state.code,
      name: this.state.name,
      tipo: this.state.tipo,
      coin_id: this.state.coin_id,
      description: this.state.description,
      excercise_start: this.state.excercise_start,
      excercise_end: this.state.excercise_end,
      account_id: this.state.account_id,
      person_id: this.state.person_id,
      buddgetstart: this.state.buddgetstart,
      buddgeupdate: this.state.buddgeupdate,
      buddgetfinal: this.state.buddgetfinal,
      balance: this.state.buddgetstart,
      returns: this.state.returns,
      deviation: this.state.deviation,
      status: this.state.status,
      approval: this.state.approval,
      approvalby_id: this.state.approvalby_id,
      dateapproval: this.state.dateapproval,
    });
    //if (res) {
    //return <Redirect to="/budgets" />;
    //return this.props.history.push('/budgets');
    //}
    window.location.href = "/budgets";
    //window.location.href = 'https://ihcafe-35ae7.firebaseapp.com/budgets/';
  };

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
                <div className="page-header-breadcrumb">
                  <ul className="breadcrumb-title">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="icofont icofont-home"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to={"/budgets"}>Ver Presupuestos</Link>
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
                        <span>
                          Ingrese correctamente cada uno de los datos
                          solicitados.
                        </span>
                        <div className="card-header-right">
                          <i className="icofont icofont-rounded-down"></i>
                          <i className="icofont icofont-refresh"></i>
                          <i className="icofont icofont-close-circled"></i>
                        </div>
                      </div>
                      <div className="card-block">
                        <div>
                          <p></p>
                          <div className="card-block">
                            <form onSubmit={this.onSubmit}>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Código de Identificación
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    onChange={this.onChangeCode}
                                    type="text"
                                    className="form-control"
                                    placeholder="Código de Identifiació del Presupuesto"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Nombre del Presupuesto
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    onChange={this.onChangeName}
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese un Nombre al Presupuesto"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Descripción del Presupuesto
                                </label>
                                <div className="col-sm-10">
                                  <textarea
                                    onChange={this.onChangedescription}
                                    rows={5}
                                    cols={5}
                                    className="form-control"
                                    placeholder="Default textarea"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Fecha de Inicio
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    onChange={this.onChangeStart}
                                    class="form-control"
                                    type="date"
                                    placeholder="Inicio del ejercicio presupuestal"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Fecha de Finalización
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    onChange={this.onChangeEnd}
                                    class="form-control"
                                    type="date"
                                    placeholder="Fin del ejercicio presupuestal"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Cuenta de Presupuesto
                                </label>
                                <div className="col-sm-10">
                                  <select
                                    onChange={this.onChangeAccount}
                                    name="select_account"
                                    className="form-control mt-3"
                                  >
                                    <option value="#">
                                      Seleccione Cuenta de Origen
                                    </option>
                                    {this.state.cuentas.map((cuenta) => (
                                      <option value={cuenta.id}>
                                        ({cuenta.coin}-{cuenta.actualbalance})-
                                        {cuenta.name}{" "}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Tipo de Moneda
                                </label>
                                <div className="col-sm-10">
                                  <select
                                    onChange={this.onChangeCoin}
                                    name="select_coin"
                                    className="form-control mt-3"
                                  >
                                    <option value="#">
                                      Seleccione Tipo de Moneda
                                    </option>
                                    {this.state.coins.map((coin) => (
                                      <option value={coin.id}>
                                        ({coin.code})-{coin.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Tipo de Presupuesto
                                </label>
                                <div className="col-sm-10">
                                  <select
                                    onChange={this.onChangeTipo}
                                    name="select_tipo"
                                    className="form-control mt-3"
                                  >
                                    <option value="#">
                                      Seleccione Tipo de Presupuesto
                                    </option>

                                    <option value="atlas">
                                      Presupuesto Atlas
                                    </option>
                                    <option value="estandar">
                                      Presupuesto Estandar
                                    </option>
                                  </select>
                                </div>
                              </div>
                              {
                                <div className="row">
                                  <label className="col-sm-4 col-lg-2 col-form-label">
                                    Presupuesto Aprobado
                                  </label>
                                  <div className="col-sm-8 col-lg-10">
                                    <div className="input-group">
                                      <span
                                        className="input-group-addon"
                                        id="basic-addon1"
                                      ></span>
                                      <input
                                        onChange={this.onChangeBudgetstart}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese Presupuesto Aprobado"
                                      />
                                    </div>
                                  </div>
                                </div>
                              }
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Estado del Presupuesto
                                </label>
                                <div className="col-sm-10">
                                  <select
                                    onChange={this.onChangeEstado}
                                    name="select_status"
                                    className="form-control"
                                  >
                                    <option value="0">Selecione Estado</option>
                                    <option value="1">Aprobado</option>
                                    <option value="2">En espera</option>
                                  </select>
                                </div>
                              </div>
                              <div className="row">
                                <label className="col-sm-4 col-lg-2 col-form-label">
                                  Guardar Presupuesto
                                </label>
                                <div className="col-sm-8 col-lg-10">
                                  <div className="input-group">
                                    <input
                                      type="submit"
                                      className="btn btn-lg btn-success"
                                    />
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
          <div id="styleSelector"></div>
        </div>
      </div>
    );
  }
}
