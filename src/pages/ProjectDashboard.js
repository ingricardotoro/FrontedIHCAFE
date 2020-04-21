import React, { Component } from "react";
//import TableCost from '../components/TableCost'
import TableCostAtlas from "../components/TableCostAtlas";
import TableCost from "../components/TableCost";

import { Link } from "react-router-dom";
import axios from "axios";

export default class ProjectDashboard extends Component {
  constructor() {
    super();
    this.state = {
      tipo_budget: "",
    };
  }

  //determinamos el tipo de presupuesto (atlas o estandar)
  async componentDidMount() {
    const res = await axios.get(
      "http://167.99.15.83:4000/api/projects/" + this.props.match.params.id
    );
    console.log(res.data);
    this.setState({ tipo_budget: res.data.data.budget.tipo });
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
                  />
                ) : (
                  <TableCost
                    idProject={this.props.match.params.id}
                    budget_tipo={this.state.tipo_budget} //atlas o estandar
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
