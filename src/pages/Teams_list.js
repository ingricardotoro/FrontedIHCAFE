import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';

export default class Team_list extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
    };
  }

  async componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = '/';
    }

    const res = await axios.get(`${API_URL}/teams/`);
    this.setState({ teams: res.data.teams });
  }

  formatMoney(number) {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'HNL',
    });
  }

  onSubmitDelete = async (id) => {
    const res_p = await axios.post(`${API_URL}/teams/delete/${id}`);
    window.location.href = '/teams_list';

    if (res_p) {
    }
  };

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
                    <h4>Gestión de Equipos de Trabajo</h4>
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
                          <h5>Catálogo de Equipos</h5>

                          <div className="product-add-modal">
                            {/* <button type="button" className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" data-toggle="modal" data-target="#modal-13"> <i className="icofont icofont-plus m-r-5" /> Nuevo Producto
                                                        </button>   */}
                            <Link to={'/teams_new'}>
                              {' '}
                              <button
                                type="button"
                                className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger"
                              >
                                {' '}
                                <i className="icofont icofont-plus m-r-5" />{' '}
                                Nuevo Equipo
                              </button>
                            </Link>
                          </div>
                          <div>{/* Modal static*/}</div>
                        </div>
                        <div className="card-block">
                          <div className="table-responsive">
                            <div className="table-content">
                              <div className="dt-responsive table-responsive">
                                <table
                                  id="e-product-list"
                                  className="table table-striped table-bordered nowrap"
                                >
                                  <thead>
                                    <tr>
                                      <th>Imagen</th>
                                      <th>Nombre</th>
                                      <th>Descripción</th>
                                      {/* <th>Balance Actual</th> */}
                                      <th>Ver Miembros</th>
                                      <th>Eliminar</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.teams.map((team) => (
                                      <tr key={team.id}>
                                        <td className="pro-list-img">
                                          <img
                                            width="80px"
                                            src={'assets/images/teams/team.jpg'}
                                            className="img-fluid"
                                            alt="tbl"
                                          />
                                        </td>
                                        <td>{team.name}</td>
                                        <td>{team.description}</td>
                                        {/* <td>{this.formatMoney(team  .actualbalance)}</td> */}
                                        <td>
                                          {' '}
                                          <Link to={'/teammembers/' + team.id}>
                                            <button
                                              type="button"
                                              className="btn btn-primary waves-effect"
                                            >
                                              Ver Miembros
                                            </button>
                                          </Link>
                                        </td>
                                        <td>
                                          <button
                                            type="button"
                                            data-toggle="modal"
                                            data-target={
                                              '#modal_delete_' + team.id
                                            }
                                            className="btn btn-danger waves-effect"
                                          >
                                            Eliminar
                                          </button>
                                        </td>

                                        {/* INICIO Modal DELETE*/}

                                        <div
                                          className="modal fade"
                                          id={'modal_delete_' + team.id}
                                          tabIndex={-1}
                                          role="dialog"
                                        >
                                          <div
                                            className="modal-dialog modal-lg"
                                            role="document"
                                          >
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h4 className="modal-title">
                                                  Eliminar Equipo de Trabajo:{' '}
                                                  {team.name}{' '}
                                                </h4>
                                                <button
                                                  type="button"
                                                  className="close"
                                                  data-dismiss="modal"
                                                  aria-label="Close"
                                                >
                                                  <span aria-hidden="true">
                                                    ×
                                                  </span>
                                                </button>
                                              </div>
                                              <div className="modal-body">
                                                <form
                                                  onSubmit={() =>
                                                    this.onSubmitDelete(team.id)
                                                  }
                                                >
                                                  <div
                                                    style={{
                                                      width: '100%',
                                                      textAlign: 'center',
                                                      display: 'inline-block',
                                                    }}
                                                  >
                                                    <button
                                                      type="submit"
                                                      className="btn btn-danger waves-effect "
                                                    >
                                                      Eliminar Este Equipo de
                                                      Trabajo
                                                    </button>
                                                  </div>
                                                </form>

                                                <div className="modal-footer">
                                                  <button
                                                    type="button"
                                                    className="btn btn-default waves-effect "
                                                    data-dismiss="modal"
                                                  >
                                                    Cerrar
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/*FIN Modal DELETE*/}
                                      </tr>
                                    ))}
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
            <div id="styleSelector"></div>
          </div>
        </div>
      </div>
    );
  }
}
