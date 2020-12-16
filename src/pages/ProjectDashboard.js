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
      budget_id: 0
    };
  }

  //determinamos el tipo de presupuesto (atlas o estandar)
  async componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = "/"
    }

    const res = await axios.get(
<<<<<<< HEAD
      "http://localhost:4000/api/projects/" + this.props.match.params.id
=======
      "http://190.92.73.69:4000/api/projects/" + this.props.match.params.id
>>>>>>> e7cd564136482e6217dddf33ebedd39481c9d4a3
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
                  />
                ) : (
                    <TableCost
                      idProject={this.props.match.params.id}
                      budget_tipo={this.state.tipo_budget} //atlas o estandar
                      budget_id={this.state.budget_id} //id del presupuesto
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
