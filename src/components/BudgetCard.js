import React, { Component } from 'react';

export default class BudgetCard extends Component {
  componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = '/';
    }
  }
  formatMoney(number) {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'HNL',
    });
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <th>Presupuesto Aprobado</th>
            {/* <th>Presupesto Solicitado</th> */}
            <th>Presupuesto Ejecutado</th>
            <th>Presupuesto Disponible</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <button
                  style={{ width: '100%' }}
                  className="btn btn-lg btn-primary  waves-effect waves-light"
                  type="button"
                >
                  {this.formatMoney(this.props.neuvoTotalAprobado)}
                </button>
              </td>
              {/* <td><button style={{ width: '100%' }} className="btn btn-lg btn-warning  waves-effect waves-light" type="button"  >{this.formatMoney(this.props.total_solicitado2)}</button></td> */}
              <td>
                <button
                  style={{ width: '100%' }}
                  className="btn btn-lg btn-danger  waves-effect waves-light"
                  type="button"
                >
                  {this.formatMoney(this.props.neuvoTotalEjecutado)}{' '}
                </button>
              </td>
              <td>
                <button
                  style={{ width: '100%' }}
                  className="btn btn-lg btn-success  waves-effect waves-light"
                  type="button"
                >
                  {this.formatMoney(
                    this.props.neuvoTotalAprobado -
                      this.props.neuvoTotalEjecutado
                  )}{' '}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
