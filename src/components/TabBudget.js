import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Projectcard from "../components/Projectcard";
import BudgetCard from "./BudgetCard";

export default class TabBudget extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      projects2: [],

      budgetLinesAtlas: [],
      total_disponible: 0.0,
      total_ejecutado: 0.0,
      total_solicitado: 0.0,

      budgetLinesAtlas2: [],
      total_disponible2: 0.0,
      total_ejecutado2: 0.0,
      total_solicitado2: 0.0,
    };
  }

  async componentDidMount() {
    const res_p2 = await axios.post(
      "http://167.99.15.83:4000/api/projects/findProjectsByBudgetId/" +
        this.props.id
    );
    this.setState({ projects2: res_p2.data.projectsbybudgetid });

    this.state.projects2.map((project2) => {
      this.calculo2(project2.id);
    });

    this.calculo1();
  }

  async calculo1() {
    const res_p = await axios.post(
      "http://167.99.15.83:4000/api/projects/findProjectsByBudgetId/" +
        this.props.id
    );
    this.setState({ projects: res_p.data.projectsbybudgetid });
  }

  async calculo2(project_id) {
    const res_bud = await axios.post(
      "http://167.99.15.83:4000/api/budgetlines/atlas/project/" + project_id
    );
    // console.warn("VALOR="+res.data.budgetLines_atlas);
    this.setState({ budgetLinesAtlas2: res_bud.data.budgetLines_atlas });

    this.state.budgetLinesAtlas2.map((budgetLine2) => {
      if (budgetLine2.status === "Solicitado") {
        this.setState((prevState) => ({
          total_solicitado2:
            prevState.total_solicitado2 + budgetLine2.budgetstart,
        }));
      }
      if (budgetLine2.status === "Aprobado") {
        this.setState((prevState) => ({
          total_ejecutado2: prevState.total_ejecutado2 + budgetLine2.balance,
        }));
      }

      this.state.total_disponible2 =
        this.props.budgetstart - this.state.total_ejecutado2;
    });
  }

  formatMoney(number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "HNL",
    });
  }

  onDelete = async (e) => {
    //e.preventDefault();
    const res_p = await axios.post(
      "http://167.99.15.83:4000/api/budgets/delete/" + this.props.id
    );

    //if (res_p) { }

    window.location.href = "/budgets";
    //eliminado
  };

  render() {
    return (
      <div>
        <div className="page-body">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h4>
                    {this.props.nombre} - ( {this.props.account}){" "}
                  </h4>

                  <span>{this.props.description}</span>
                  <div className="card-header-right">
                    <i className="icofont icofont-rounded-down"></i>
                    <Link to={"/budgets/edit/" + this.props.id}>
                      <i className="icofont icofont-edit"></i>
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      data-toggle="modal"
                      data-target={"#modal_delete_" + this.props.id}
                    >
                      <i className="icofont icofont-close-circled"></i>
                    </button>
                  </div>

                  <div>
                    <BudgetCard
                      total_disponible2={this.state.total_disponible2}
                      total_ejecutado2={this.state.total_ejecutado2}
                      total_solicitado2={this.state.total_solicitado2}
                      budgetstart={this.props.budgetstart}
                      budget_id={this.props.id}
                    />

                    {/* Add Contact Start Model */}
                    <div>
                      {/* Modal large*/}

                      <div
                        className="modal fade"
                        id={"modal_delete_" + this.props.id}
                        tabIndex={-1}
                        role="dialog"
                      >
                        <div className="modal-dialog modal-lg" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4 className="modal-title">
                                Eliminar Presupuesto: {this.props.nombre}{" "}
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
                              <div
                                style={{
                                  width: "100%",
                                  textAlign: "center",
                                  display: "inline-block",
                                }}
                              >
                                <button
                                  onClick={() => this.onDelete()}
                                  type="submit"
                                  className="btn btn-danger waves-effect "
                                >
                                  Eliminar Este Presupuesto
                                </button>
                              </div>

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
                    </div>

                    {/* Add Contact Ends Model*/}
                  </div>

                  {/* end of pull-right class */}
                </div>
                <div className="card-block">
                  <div className="row">
                    {this.state.projects.map((project) => (
                      <Projectcard
                        name={project.name}
                        id={project.id}
                        budgetstart={project.budgetstart}
                        startdate={project.startdate}
                        enddate={project.enddate}
                        description={project.description}
                        status={project.status}
                        priority={project.priority}
                        location={project.location}
                      />
                    ))}

                    <div className="col-sm-6">
                      <div className="card card-border-default">
                        <div className="card-header" align="center">
                          <Link to={"/projects/new"}>
                            <h3>Crear Nuevo Proyecto</h3>
                          </Link>
                        </div>
                        <div className="card-block">
                          <div className="row">
                            <div className="col-sm-12" align="center">
                              <Link to={"/projects/new"}>
                                <i
                                  style={{ color: "#54d98c" }}
                                  className="icofont icofont-plus-circle icofont-5x "
                                ></i>
                              </Link>
                            </div>
                            {/* end of col-sm-8 */}
                          </div>
                          {/* end of row */}
                        </div>
                        <div className="card-footer">
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
                          </div>
                          <div className="task-board">
                            <div>
                              <button
                                className="btn btn-primary  waves-effect waves-light"
                                type="button"
                              >
                                LPS. {this.state.total_inicial}{" "}
                              </button>
                              <button
                                className="btn btn-danger  waves-effect waves-light"
                                type="button"
                              >
                                LPS. {this.state.total_ejecutado}{" "}
                              </button>
                              <button
                                className="btn btn-success  waves-effect waves-light"
                                type="button"
                              >
                                LPS. {this.state.total_disponible}{" "}
                              </button>

                              {/* end of dropdown menu */}
                            </div>

                            {/* end of dropdown-secondary */}
                          </div>{" "}
                          <hr />
                          {/* end of pull-right class */}
                        </div>
                        {/* end of card-footer */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> /* div FINAL*/
    );
  }
}
