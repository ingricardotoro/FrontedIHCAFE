import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class BudgetEdit extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
      name: '',
      tipo: '',
      coin_id: 0,
      description: '',
      excercise_start: '',
      excercise_end: '',
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
      budget: [],

      cuenta_id: 0,
      cuenta_name: '',
      moneda_id: 0,
      moneda_name: '',
    };
  }

  async componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = '/';
    }

    const res8 = await axios.post(
      'http://167.99.15.83:4000/api/budgets/findBudgetById/' +
        this.props.match.params.id
    );

    this.setState({ budget: res8.data.budget[0] });
    this.setState({ buddgetstart: this.state.budget.buddgetstart });
    this.setState({ code: this.state.budget.code });
    this.setState({ name: this.state.budget.name });
    this.setState({ description: this.state.budget.description });

    this.setState({ cuenta_id: this.state.budget.account.id });
    this.setState({ cuenta_name: this.state.budget.account.name });

    this.setState({ moneda_id: this.state.budget.coin.id });
    this.setState({ moneda_name: this.state.budget.coin.name });

    this.setState({ tipo_id: this.state.budget.tipo });
    this.setState({ tipo_name: this.state.budget.tipo });

    const res6 = await axios.get('http://167.99.15.83:4000/api/accounts/');
    this.setState({ cuentas: res6.data.cuentas });

    const res7 = await axios.get('http://167.99.15.83:4000/api/coins/');
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
    const res = await axios.post(
      'http://167.99.15.83:4000/api/budgets/edit/' + this.state.budget.id,
      {
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
        // status: this.state.status,
        approval: this.state.approval,
        approvalby_id: this.state.approvalby_id,
        dateapproval: this.state.dateapproval,
      }
    );
    //if (res) {
    //return <Redirect to="/budgets" />;
    //return this.props.history.push('/budgets');
    //}
    window.location.href = '/budgets';
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
                  <h4>Editar Presupuesto</h4>
                  <span>Edición del Ejercicio Presupuestal</span>
                </div>
                <div className="page-header-breadcrumb">
                  <ul className="breadcrumb-title">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="icofont icofont-home"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to={'/budgets'}>Ver Presupuestos</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="page-body">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h5>Formulario de Edición</h5>
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
                                    //onChange={this.onChangeCode}
                                    type="text"
                                    className="form-control"
                                    placeholder="Código de Identifiació del Presupuesto"
                                    value={this.state.code}
                                    onChange={(e) => {
                                      this.setState({
                                        code: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Nombre del Presupuesto
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    //onChange={this.onChangeName}
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese un Nombre al Presupuesto"
                                    value={this.state.name}
                                    onChange={(e) => {
                                      this.setState({
                                        name: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Descripción del Presupuesto
                                </label>
                                <div className="col-sm-10">
                                  <textarea
                                    //onChange={this.onChangedescription}
                                    rows={5}
                                    cols={5}
                                    className="form-control"
                                    placeholder="Default textarea"
                                    value={this.state.description}
                                    onChange={(e) => {
                                      this.setState({
                                        description: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              {/*  <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Fecha de Inicio
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    onChange={this.onChangeStart}
                                    class="form-control"
                                    type="date"
                                    placeholder="Inicio del ejercicio presupuestal"
                                    value={this.state.budget.excercise_start}
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
                                    value={this.state.budget.excercise_end}
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
                                    <option value={this.state.cuenta_id}>
                                      {this.state.cuenta_name}
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
                                    <option value={this.state.moneda_id}>
                                      {this.state.moneda_name}
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
                                    <option value={this.state.tipo_id}>
                                      {this.state.tipo_name}
                                    </option>

                                    <option value="atlas">
                                      Presupuesto Atlas
                                    </option>
                                    <option value="estandar">
                                      Presupuesto Estandar
                                    </option>
                                  </select>
                                </div>
                              </div>*/}
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
                                        value={this.state.buddgetstart}
                                        onChange={(e) => {
                                          this.setState({
                                            buddgetstart: e.target.value,
                                          });
                                        }}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese Presupuesto Aprobado"
                                      />
                                    </div>
                                  </div>
                                </div>
                              }

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
