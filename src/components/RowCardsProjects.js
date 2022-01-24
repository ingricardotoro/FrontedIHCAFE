import React, { Component } from 'react';

export default class RowCardsProjects extends Component {
  componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = '/';
    }
  }

  formatMoney(number) {
    if (number) {
      return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'HNL',
      });
    }
    //return number;
  }

  render() {
    return (
      <div>
        <div className="row">
          {/* statstic card start */}
          <div className="col-md-12 col-xl-4">
            <div className="card widget-statstic-card borderless-card">
              <div className="card-header">
                <div className="card-header-left">
                  <h5>Presupuesto Inicial</h5>
                  <p className="p-t-10 m-b-0 text-muted">
                    Total de Presupuesto Inicial Aprobado
                  </p>
                </div>
              </div>
              <div className="card-block">
                <i className="icofont icofont-presentation-alt st-icon bg-primary" />
                <div className="text-left">
                  <h3 className="d-inline-block">
                    {' '}
                    {this.formatMoney(this.props.aprobado)}{' '}
                  </h3>
                  <p>
                    {this.props.aprobado === 0 ? (
                      <span className="f-right bg-primary">0%</span>
                    ) : (
                      <span className="f-right bg-primary">100%</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* statstic card end */}
          {/* statstic card start */}
          {/* <div className="col-md-6 col-xl-4">
            <div className="card widget-statstic-card borderless-card">
              <div className="card-header">
                <div className="card-header-left">
                  <h5>Solicitado</h5>
                  <p className="p-t-10 m-b-0 text-muted">
                    Total de Presupuestos Solicitado
                  </p>
                </div>
              </div>
              <div className="card-block">
                <i className="icofont icofont-chart-line st-icon bg-warning" />
                <div className="text-left">
                  <h3 className="d-inline-block">
                    {this.formatMoney(this.props.solicitado)}
                  </h3>
                  <p>
                    <span className="f-right bg-warning">
                      {Math.round(this.props.porcentaje_solicitado)}%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          {/* statstic card end */}
          {/* statstic card start */}
          <div className="col-md-6 col-xl-4">
            <div className="card widget-statstic-card borderless-card">
              <div className="card-header">
                <div className="card-header-left">
                  <h5>Presupuesto Ejecutado</h5>
                  <p className="p-t-10 m-b-0 text-muted">
                    Total del Presupuesto ejecutado
                  </p>
                </div>
              </div>
              <div className="card-block">
                <i className="icofont icofont-presentation-alt st-icon bg-danger txt-lite-color" />
                <div className="text-left">
                  <h3 className="d-inline-block">
                    {this.formatMoney(this.props.ejecutado)}
                  </h3>
                  <p>
                    <span className="f-right bg-danger">
                      {this.props.aprobado === 0 ? (
                        <span>0%</span>
                      ) : (
                        Math.round(
                          (this.props.ejecutado * 100) / this.props.aprobado
                        ) + '%'
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* statstic card end */}

          {/* statstic card start */}
          <div className="col-md-6 col-xl-4">
            <div className="card widget-statstic-card borderless-card">
              <div className="card-header">
                <div className="card-header-left">
                  <h5>Presupuesto Disponible</h5>
                  <p className="p-t-10 m-b-0 text-muted">
                    Total del presupuesto disponible
                  </p>
                </div>
              </div>
              <div className="card-block">
                <i className="icofont icofont-chart-line st-icon bg-success" />
                <div className="text-left">
                  <h3 className="d-inline-block">
                    {this.formatMoney(
                      this.props.aprobado - this.props.ejecutado
                    )}
                  </h3>
                  <p>
                    <span className="f-right bg-success">
                      {this.props.aprobado === 0 ? (
                        <span>0%</span>
                      ) : (
                        Math.round(
                          ((this.props.aprobado - this.props.ejecutado) * 100) /
                            this.props.aprobado
                        ) + '%'
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* statstic card end */}
        </div>
      </div>
    );
  }
}
