import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Projectcard extends Component {
  constructor() {
    super();
    this.state = {
      budgetLines_Atlas: [],
      budgetLines: [],
      total_disponible: 0.0,
      total_ejecutado: 0.0,
      total_inicial: 0.0,
      total_Solicitado: 0.0,
      total_reembolsos: 0.0,

      nuevoTotalAprobado: 0.0,
      nuevoTotalEjecutado: 0.0,
    };
  }

  async componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = '/';
    }

    const res = await axios.post(
      'https://167.99.15.83:4000/api/budgetlines/atlas/project/' + this.props.id
    );
    this.setState({ budgetLines_Atlas: res.data.budgetLines_atlas });
    this.calculo();
    this.calculo2();
  }

  formatMoney(number) {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'HNL',
    });
  }

  async calculo2() {
    let sumaTotalAprobado = 0.0;
    let sumaTotoalEjecutado = 0.0;
    let nuevoTotalAprobado = 0.0;
    let nuevoTotalEjecutado = 0.0;
    const res = await axios.post(
      'https://167.99.15.83:4000/api/budgetlines/project/' + this.props.id
    );
    const buds = res.data.budgetLines;

    buds.map((bl) => {
      sumaTotalAprobado += parseFloat(bl.buddgetstart);

      if (bl.status === 'Ejecutado') {
        sumaTotoalEjecutado += parseFloat(bl.balance);
      }
    });
    this.setState({ nuevoTotalEjecutado: sumaTotoalEjecutado });
    this.setState({ nuevoTotalAprobado: sumaTotalAprobado });
  }

  async calculo() {
    // para realizar el calculo de la suma de presupuestos

    this.state.total_Solicitado = 0;

    for (let index = 0; index < this.state.budgetLines_Atlas.length; index++) {
      if (this.state.budgetLines_Atlas[index].status === 'Solicitado') {
        this.state.total_Solicitado +=
          this.state.budgetLines_Atlas[index].balance;
        //this.setState({total_Solicitado: prevState.total_Solicitado + this.budgetLines[index].budgetstart});
        //this.setState(prevstate => ({ total_Solicitado: prevstate.total_Solicitado + this.budgetLines[index].budgetstart}));
      }

      if (this.state.budgetLines_Atlas[index].status === 'Aprobado') {
        //this.state.total_inicial +=   this.state.budgetLines[index].budgetstart;
        this.state.total_ejecutado +=
          this.state.budgetLines_Atlas[index].balance;
        this.state.total_disponible =
          this.props.budgetstart - this.state.total_ejecutado;
        //this.state.total_reembolsos += this.state.budgetLines[index].returns;
      }
    }
  }

  render() {
    this.calculo();
    return (
      <div className="col-sm-6">
        <div className="card card-border-default">
          <div className="card-header">
            <Link to={'/project/' + this.props.id} className="card-title">
              {this.props.name}
            </Link>
            <Link
              to={'/project/edit/' + this.props.id}
              className="btn btn-sm btn-warning f-right   "
            >
              {' '}
              Editar{' '}
            </Link>
            {/* <span className="label label-danger f-right">  {this.props.enddate} </span> */}
            <span className="label label-primary f-right">
              {' '}
              {this.props.startdate}{' '}
            </span>
          </div>
          <div className="card-block">
            <div className="row">
              <div className="col-sm-12">
                <p className="task-detail">{this.props.description} </p>
                <hr />
                <p className="task-due">
                  <strong> Ubiación : </strong>
                  <strong className="label label-info">
                    {this.props.location}{' '}
                  </strong>
                  <strong> Estatus : </strong>
                  <strong className="label label-danger">
                    {this.props.status}{' '}
                  </strong>
                  <strong> Prioridad : </strong>
                  <strong className="label label-warning">
                    {this.props.priority}{' '}
                  </strong>
                </p>
              </div>
              {/* end of col-sm-8 */}
            </div>
            {/* end of row */}
          </div>
          <div className="card-footer">
            <div>
              <table style={{ width: '100%' }} className="table-striped">
                <thead>
                  <th>Tipo</th>
                  <th>Valor</th>
                </thead>
                <tbody>
                  <tr>
                    <td>Presupuesto Aprobado </td>
                    {/* <td>{this.formatMoney(this.state.total_inicial)}</td> */}
                    <td>{this.formatMoney(this.state.nuevoTotalAprobado)}</td>
                    {/* <td>{this.formatMoney(this.state.total_Solicitado)}</td> */}
                  </tr>
                  <tr>
                    <td>Presupuesto Ejecutado</td>
                    <td>{this.formatMoney(this.state.nuevoTotalEjecutado)}</td>
                  </tr>
                  {/*  <tr>
                                        <td>Total de Reembolsos</td>
                                        <td >{this.formatMoney(this.state.total_reembolsos)}</td>
                                        <td>---</td>
                                    </tr> */}
                  <tr>
                    <td>Presupueto Disponible</td>
                    <td>
                      {this.formatMoney(
                        this.state.nuevoTotalAprobado -
                          this.state.nuevoTotalEjecutado
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                {/*      <button className="btn btn-primary  waves-effect waves-light" type="button"  >LPS. {this.state.total_inicial} </button>
                                        <button className="btn btn-danger  waves-effect waves-light" type="button"  >LPS. {this.state.total_ejecutado} </button>
                                        <button className="btn btn-success  waves-effect waves-light" type="button"  >LPS. {this.state.total_disponible} </button>
                                    */}
                {/* end of dropdown menu */}
              </div>
              {/* end of dropdown-secondary */}
            </div>
            <hr />

            <div className="task-list-table">
              <a href="#!">
                <img
                  className="img-fluid img-circle"
                  src="assets/images/avatar-1.png"
                  alt={1}
                />
              </a>
              <a href="#!">
                <img
                  className="img-fluid img-circle"
                  src="assets/images/avatar-2.png"
                  alt={1}
                />
              </a>
              <a href="#!">
                <i className="icofont icofont-plus" />
              </a>
            </div>
            {/* end of pull-right class */}
          </div>
          {/* end of card-footer */}
        </div>
      </div>
    );
  }
}
