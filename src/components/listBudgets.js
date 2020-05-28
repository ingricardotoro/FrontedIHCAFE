import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TabBudget from "../components/TabBudget";
import jwt_decode from 'jwt-decode'

export default class listBudgets extends Component {
  constructor() {
    super();
    this.state = {
      budgets: [],
      user_name: "",
      user_lastname: ""
    };
  }

  async componentDidMount() {

    if (!localStorage.usertoken) {
      window.location.href = "/"
    }

    const token = localStorage.usertoken
    const decode = jwt_decode(token)
    this.setState({
      user_name: decode.name,
      user_lastname: decode.lastname
    })


    const res = await axios.get("http://167.99.15.83:4000/api/budgets/all");
    this.setState({ budgets: res.data.budgets });
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
                    <h4>Presupuestos {this.state.name} -  {this.state.lastname} </h4>

                    <span>Listado de Presupuestos 2020</span>
                  </div>

                  <div>
                    <Link
                      to={"/budgets/new"}
                      type="button"
                      className="btn btn-primary waves-effect waves-light f-left mt-3 d-inline-block md-trigger"
                    >
                      <i className="icofont icofont-plus m-r-5" /> Crear Nuevo
                      Presupuesto
                    </Link>
                  </div>

                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="icofont icofont-home"></i>
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="#!">Presupuestos</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-5">
                  {console.warn("VARLO=" + this.state.budgets.name)}
                  {this.state.budgets.map((budget) => (
                    <TabBudget
                      nombre={budget.name}
                      id={budget.id}
                      description={budget.description}
                      //account={budget.account.name}
                      budgetstart={budget.buddgetstart}
                      budgetupdate={budget.buddgeupdate}
                      balance={budget.balance}
                      returns={budget.returns}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div id="styleSelector"></div>
          </div>
        </div>
      </div>
    );
  }
}
