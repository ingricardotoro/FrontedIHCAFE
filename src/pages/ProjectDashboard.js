import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import TableCost from '../components/TableCost'
import TableCostAtlas from "../components/TableCostAtlas";
//import TableCost from "../components/TableCost_orginal";

import axios from "axios";

export default class ProjectDashboard extends Component {
  constructor() {
    super();
    this.state = {
      tipo_budget: "",
      budget_id: 0
    };
  }

  //determinamos el tipo de presupuesto (atlas o estandar)
  async componentDidMount() {

    //console.log("P=" + JSON.stringify(history))
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = "/"
    }

    const res = await axios.get(
      "http://167.99.15.83:4000/api/projects/" + this.props.match.params.id
    );
    this.setState({ tipo_budget: res.data.data.budget.tipo });
    this.setState({ budget_id: res.data.data.budget.id });
  }

  render() {
    return (
      <div>
        <div className="pcoded-content">
          <div className="pcoded-inner-content">
            <div className="main-body">
              <div className="page-wrapper">
                <div className="page-header page-wrapper">
                  <div className="page-header-title">
                    <h4>Renglones Presupuestarios</h4>
                    <span>Descripcción de los costos y gastos.</span>
                  </div>
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="icofont icofont-home"></i>
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to={"/budgets"}>Presupuestos</Link>
                      </li>
                      <li className="breadcrumb-item">Renglones</li>
                    </ul>
                  </div>
                </div>

                {this.state.tipo_budget === "atlas" ? (

                  <TableCostAtlas
                    idProject={this.props.match.params.id}
                    budget_tipo={this.state.tipo_budget} //atlas o estandar
                    budget_id={this.state.budget_id} //id del presupuesto
                    history={this.props.history}
                  />
                ) : (
                  <TableCost
                    idProject={this.props.match.params.id}
                    budget_tipo={this.state.tipo_budget} //atlas o estandar
                    budget_id={this.state.budget_id} //id del presupuesto
                    history={this.props.history}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
