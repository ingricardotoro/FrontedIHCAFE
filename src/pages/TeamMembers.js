import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';

export default class TeamMembers extends Component {
  constructor() {
    super();
    this.state = {
      team: [],
      teammembers: [],
      users: [],
      roles: [],
      person_id: 0,
      role_id: 0,
    };
  }

  async componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = '/';
    }

    //obtenemos el id del equipo que viene por url
    const res = await axios.get(
      `${API_URL}/teams/${this.props.match.params.id}`
    );
    this.setState({ team: res.data.team });

    //buscamos los miembros de este equipo para listarlos
    const res2 = await axios.get(
      `${API_URL}/teammembers/${this.state.team.id}`
    );
    this.setState({ teammembers: res2.data.teammembers });

    //listados los usuario para agregarlos
    const res3 = await axios.get(`${API_URL}/users`);
    this.setState({ users: res3.data.users });

    //listados los roles para agregarlos
    const res4 = await axios.get(`${API_URL}/roles`);
    this.setState({ roles: res4.data.roles });
  }

  onChangeUser = (e) => {
    this.setState({ person_id: e.target.value });
  };
  onChangeRole = (e) => {
    this.setState({ role_id: e.target.value });
  };

  onSubmitDelete = async (id) => {
    const res_p = await axios.post(`${API_URL}/teammembers/delete/${id}`);

    window.location.replace('');
    //window.location.href = "http://167.99.15.83/teammembers/" + this.state.team.id;

    if (res_p) {
    }
  };

  onSubmitAddMember = async (e) => {
    //console.log("Aqui vamossss")
    //e.preventDefault();
    await axios.post(API_URL + '/teammembers', {
      team_id: this.state.team.id,
      person_id: this.state.person_id,
      rol_id: this.state.role_id,
    });
    window.location.href = '/teammembers/' + this.state.team.id;
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
                    <h4>Gestión de Miembros de Equipos</h4>
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
                          <h5>
                            Miembros del Equipo:" {this.state.team.name} "
                          </h5>

                          <div className="product-add-modal">
                            <button
                              type="button"
                              data-toggle="modal"
                              data-target={'#modal_add_' + this.state.team.id}
                              className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger"
                            >
                              {' '}
                              <i className="icofont icofont-plus m-r-5" />{' '}
                              Agregar Nuevo Miembro
                            </button>
                          </div>
                          <div></div>
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
                                      <th>Nombre Equipo</th>
                                      <th>Miembro</th>
                                      <th>Rol</th>
                                      {/* <th>Ver Miembros</th> */}
                                      <th>Eliminar</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.teammembers.map((member) => (
                                      <tr key={member.id}>
                                        <td className="pro-list-img">
                                          <img
                                            width="80px"
                                            src={
                                              '../assets/images/teams/avatar-5.png'
                                            }
                                            className="img-fluid"
                                            alt="tbl"
                                          />
                                        </td>
                                        <td>{this.state.team.name}</td>
                                        <td>
                                          {member.user.name}{' '}
                                          {member.user.lastname}
                                        </td>
                                        <td>{member.role.role_name}</td>
                                        {/* <td> <Link to={'/teammembers/' + team.id} ><button type="button" className="btn btn-primary waves-effect" >Ver Miembros</button></Link></td> */}
                                        <td>
                                          <button
                                            type="button"
                                            data-toggle="modal"
                                            data-target={
                                              '#modal_delete_' + member.id
                                            }
                                            className="btn btn-danger waves-effect"
                                          >
                                            Eliminar
                                          </button>
                                        </td>

                                        {/* INICIO Modal DELETE*/}

                                        <div
                                          className="modal fade"
                                          id={'modal_delete_' + member.id}
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
                                                  Eliminar Miembro del Equipo:{' '}
                                                  {member.user.name}-
                                                  {member.user.lastname}{' '}
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
                                                    this.onSubmitDelete(
                                                      member.id
                                                    )
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
                                                      Eliminar Este Miembro del
                                                      Equipo
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
                                {/* INICIO Modal Add Member*/}

                                <div
                                  className="modal fade"
                                  id={'modal_add_' + this.state.team.id}
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
                                          Agergar Miembro al Equipo:{' '}
                                          {this.state.team.name}{' '}
                                        </h4>

                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">×</span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        <form>
                                          <div
                                            style={{
                                              width: '100%',
                                              textAlign: 'center',
                                              display: 'inline-block',
                                            }}
                                          >
                                            <div className="form-group row">
                                              <label className="col-sm-2 col-form-label">
                                                Seleccione Miembro
                                              </label>
                                              <div className="col-sm-10">
                                                <select
                                                  onChange={this.onChangeUser}
                                                  name="select"
                                                  className="form-control"
                                                >
                                                  <option value="#">
                                                    Seleccionar...
                                                  </option>
                                                  {this.state.users.map(
                                                    (user) => (
                                                      <option
                                                        key={user.id}
                                                        value={user.id}
                                                      >
                                                        {user.name}{' '}
                                                        {user.lastname}{' '}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </div>
                                            </div>

                                            <div className="form-group row">
                                              <label className="col-sm-2 col-form-label">
                                                Seleccione Rol
                                              </label>
                                              <div className="col-sm-10">
                                                <select
                                                  onChange={this.onChangeRole}
                                                  name="select"
                                                  className="form-control"
                                                >
                                                  <option value="#">
                                                    Seleccionar...
                                                  </option>
                                                  {this.state.roles.map(
                                                    (rol) => (
                                                      <option
                                                        key={rol.id}
                                                        value={rol.id}
                                                      >
                                                        {rol.role_name}{' '}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </div>
                                            </div>

                                            <button
                                              onClick={() =>
                                                this.onSubmitAddMember()
                                              }
                                              type="button"
                                              className="btn btn-success waves-effect "
                                            >
                                              Agregar Miembro
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

                                {/*FIN Modal Add Member*/}
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
