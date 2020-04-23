import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";

import { Link } from "react-router-dom";
export default class Reports extends Component {
  constructor() {
    super();
    this.state = {
      budgets: [],
      budget_id: 0,
      projects: [],
      project_id: 0,
      trimestre: 0,
    };
  }

  async componentDidMount() {
    const res = await axios.get("http://167.99.15.83:4000/api/budgets/");
    this.setState({ budgets: res.data.budgets });

    /*const res = await axios.get("http://167.99.15.83:4000/api/coins/");
    this.setState({ budgets: res.data.budgets });*/
  }

  onChangeSelectBudget = async (e) => {
    this.setState({ budget_id: e.target.value });

    const res_p = await axios.post(
      "http://167.99.15.83:4000/api/projects/findProjectsByBudgetId/" +
        e.target.value
    );
    this.setState({ projects: res_p.data.projectsbybudgetid });
  };

  onChangeSelectProject = async (e) => {
    this.setState({ project_id: e.target.value });
  };
  onChangeSelectTrimestre = async (e) => {
    this.setState({ trimestre: e.target.value });
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
                    <h4>Gestión de Reportes</h4>
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
                          <h5>Creación de Reportes</h5>

                          <div className="product-add-modal">
                            {/* <button type="button" className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" data-toggle="modal" data-target="#modal-13"> <i className="icofont icofont-plus m-r-5" /> Nuevo Producto
                                            </button>   
                                            <Link to={'/account_new'} > <button  type="button" className="btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" > <i className="icofont icofont-plus m-r-5" /> Nueva Cuenta
                                            </button>  </Link> */}
                          </div>
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
                                      <th>Prespupuesto</th>
                                      <th>Proyecto</th>
                                      <th>Moneda</th>
                                      <th>Trimestre</th>
                                      <th>Año</th>
                                      <th>Ver Reporte</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <label>Prespupuesto</label>
                                        <select
                                          onChange={this.onChangeSelectBudget}
                                          className="form-control mb-3"
                                          name="presupuesto"
                                        >
                                          <option value="0">
                                            Seleccione Presupuesto{" "}
                                          </option>
                                          {this.state.budgets.map((budget) => (
                                            <option value={budget.id}>
                                              {budget.name}{" "}
                                            </option>
                                          ))}
                                        </select>
                                      </td>
                                      <td>
                                        <label>Proyecto</label>
                                        <select
                                          onChange={this.onChangeSelectProject}
                                          className="form-control mb-3"
                                          name="proyecto"
                                        >
                                          <option value="0">
                                            Seleccione Proyecto
                                          </option>
                                          {this.state.projects.map(
                                            (project) => (
                                              <option value={project.id}>
                                                {project.name}{" "}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </td>
                                      <td>
                                        <label>Moneda</label>
                                        <select
                                          className="form-control mb-3"
                                          name="anio"
                                        >
                                          <option value="1">LPS</option>
                                          <option value="2">Dolar</option>
                                          <option value="3">EURO</option>
                                        </select>
                                      </td>
                                      <td>
                                        <label>Trimestre</label>

                                        <select
                                          onChange={
                                            this.onChangeSelectTrimestre
                                          }
                                          className="form-control mb-3"
                                          name="trimestre"
                                        >
                                          <option value="1">
                                            Seleccione Trimestre
                                          </option>
                                          <option value="1">Trimestre 1</option>
                                          <option value="2">Trimestre 2</option>
                                          <option value="3">Trimestre 3</option>
                                          <option value="4">Trimestre 4</option>
                                        </select>
                                      </td>
                                      <td>
                                        <label>Año</label>
                                        <select
                                          className="form-control mb-3"
                                          name="anio"
                                        >
                                          <option value="2020">2020</option>
                                          <option value="2021">2021</option>
                                          <option value="2022">2022</option>
                                        </select>
                                      </td>
                                      <td>
                                        <label>Crear Reporte</label>
                                        <Link
                                          to={
                                            "/report_view/" +
                                            this.state.budget_id +
                                            "/" +
                                            this.state.project_id +
                                            "/" +
                                            this.state.trimestre
                                          }
                                          className="btn btn-block btn-primary"
                                        >
                                          Generar
                                        </Link>
                                      </td>
                                    </tr>
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
