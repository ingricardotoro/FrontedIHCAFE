import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Link } from 'react-router-dom'

export default class Reports extends Component {

  constructor() {
    super();
    this.state = {
      array1: [],
      budgets: [],
      budgets_atlas: [],
      budget_id: 0,
      budget_atlas_id: 0,
      coin_id: 1,
      year: 2020,
      projects: [],
      projects_atlas: [],
      project_id: 0,
      trimestre: 0,
      modena: 'Lempiras',
      budgetLinesAtlas: [],
      accounts_atlas: [],
      arrayBudgetLines: [],

      ArrayReportebyProject: []
    };
  }

  // JSpdf Generator For generating the PDF
  reporte_atlas_by_project = () => {

    const anio = this.state.year;
    let coin = ''
    switch (this.state.coin_id) {
      case 1:
        this.setState({ modena: "Lempiras" })
        coin = "LPS"
        break;
      case 2:
        this.setState({ modena: "Dolares" })
        coin = "$"
        break;
      case 3:
        this.setState({ modena: "Euros" })
        coin = "€"
        break;

      default: this.setState({ modena: "Lempiras" })
        coin = "LPS."
        break;
    }

    // Example From https://parall.ax/products/jspdf
    var doc = new jsPDF('p', 'pt');

    //var finalY = doc.previousAutoTable.finalY
    //doc.text('From javascript arrays', 14, finalY + 15)
    doc.text('IHCAFE', 280, 30)
    doc.text('Reporte de Presupuesto ATlAS ', 200, 50)
    doc.text('Proyecto CONECTA+ (' + anio + ') Modena:' + this.state.modena, 130, 70)

    doc.autoTable({
      head: headRows(),
      body: bodyRows(this.state.ArrayReportebyProject),
      startY: 100,
      showHead: 'firstPage',
    })

    function headRows() {
      return [
        {
          code: 'Cuentas Atlas', name: 'Detalles', Aprobado: "inicial", Ejecutado: 'Ejecutado'
        }
        //{ id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
      ]
    }

    function formatMoney(number) {
      if (coin === "LPS") {
        return number.toLocaleString("en-US", {
          style: "currency",
          currency: "LPS",
        });
      }
      if (coin === "$") {
        return number.toLocaleString("en-US", {
          style: "currency",
          currency: "$",
        });
      }
      if (coin === "€") {
        return number.toLocaleString("en-US", {
          style: "currency",
          currency: "€",
        });
      }

      //return number;
    }

    function bodyRows(ArrayReportebyProject) {
      var body = [];
      for (let index = 0; index < ArrayReportebyProject.length; index++) {
        body.push({
          code: ArrayReportebyProject[index].atlas_account.code,
          name: ArrayReportebyProject[index].atlas_account.name,
          Aprobado: formatMoney(ArrayReportebyProject[index].inicial),
          Ejecutado: formatMoney(ArrayReportebyProject[index].TOTAL)
        });
      }
      return body
    }

    // Save the Data
    doc.save('Generated'.pdf);
  }


  async componentDidMount() {

    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = "/"
    }

    const res = await axios.get("http://190.92.73.69:4000/api/budgets/");
    this.setState({ budgets: res.data.budgets });

    const res_atlas = await axios.get("http://190.92.73.69:4000/api/budgets/atlas");
    this.setState({ budgets_atlas: res_atlas.data.budgets });

    const res_account_atlas = await axios.get(
      "http://190.92.73.69:4000/api/atlas/accounts"
    );
    this.setState({ accounts_atlas: res_account_atlas.data.atlas_accounts });

    /*const res = await axios.get("http://190.92.73.69:4000/api/coins/");
    this.setState({ budgets: res.data.budgets });*/
  }

  onChangeSelectBudget = async (e) => {
    this.setState({ budget_id: e.target.value });

    const res_p = await axios.post(
      "http://190.92.73.69:4000/api/projects/findProjectsByBudgetId/" +
      e.target.value
    );
    this.setState({ projects: res_p.data.projectsbybudgetid });
  };

  onChangeSelectBudget_Atlas = async (e) => {
    this.setState({ budget_atlas_id: e.target.value });
    this.state.arrayBudgetLines = [];//lo iniciaiza

    const res_pro_atlas = await axios.post(
      "http://190.92.73.69:4000/api/projects/findProjectsByBudgetId/" +
      e.target.value
    );
    this.setState({ projects_atlas: res_pro_atlas.data.projectsbybudgetid });

    this.state.projects_atlas.map(async (p_atlas) => {
      //llamamos los gastos hechos en este proyecto y presupuesto
      const res = await axios.post(
        "http://190.92.73.69:4000/api/budgetlines/atlas/project/" + p_atlas.id
      );

      this.setState({ budgetLinesAtlas: res.data.budgetLines_atlas });
      this.state.arrayBudgetLines.push(res.data.budgetLines_atlas);

      //recorremos todos los gastos de este proyecto
      Object.keys(this.state.budgetLinesAtlas).map((budg_line) => {
        if (budg_line === "Aprobado") {
          this.state.total_ejecutado += this.state.budg_line.balance;

        }
      })
    })
  };

  onChangeSelectProject_Atlas = async (e) => {
    this.setState({ project_id: e.target.value });

    const res_pro_atlas = await axios.post(
      "http://190.92.73.69:4000/api/budgetlines/atlas/reporte_atlas_by_project/" +
      e.target.value
    );

    this.setState({ ArrayReportebyProject: res_pro_atlas.data.ArrayReportebyProject });
    console.log(this.state.ArrayReportebyProject)

  };
  onChangeSelectCoin = async (e) => {
    this.setState({ coin_id: e.target.value });
  };
  onChangeSelectTrimestre = async (e) => {
    this.setState({ trimestre: e.target.value });
  };
  onChangeSelectYear = async (e) => {
    this.setState({ year: e.target.value });
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
                    <h4>Gestión de Reportes Estandar</h4>
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
                          <h5>Reportes de Usuarios</h5>

                          <div className="product-add-modal">

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
                                      <th>Reportes de Usuarios</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <Link to={'reports/excel_users'} className="btn btn-block btn-success" > Generate Excel de Usuarios </Link>
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


                  {/* 
                  <div className="row">
                    <div className="col-sm-12">
                      
                      <div className="card product-add-modal">
                        <div className="card-header">
                          <h5>Creación de Reportes ATLAS TOTAL</h5>

                          <div className="product-add-modal">

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

                                      <th>Moneda</th>

                                      <th>Año</th>
                                      <th>Ver Reporte</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <label>Prespupuesto</label>
                                        <select
                                          onChange={this.onChangeSelectBudget_Atlas}
                                          className="form-control mb-3"
                                          name="presupuesto"
                                        >
                                          <option value="0">
                                            Seleccione Presupuesto{" "}
                                          </option>
                                          {this.state.budgets_atlas.map((budget) => (
                                            <option value={budget.id}>
                                              {budget.name}{" "}
                                            </option>
                                          ))}
                                        </select>
                                      </td>

                                      <td>
                                        <label>Moneda</label>
                                        <select
                                          onChange={this.onChangeSelectCoin}
                                          className="form-control mb-3"
                                          name="anio"
                                        >
                                          <option value="1">LPS</option>
                                          <option value="2">Dolar</option>
                                          <option value="3">EURO</option>
                                        </select>
                                      </td>

                                      <td>
                                        <label>Año</label>
                                        <select
                                          onChange={this.onChangeSelectYear}
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

                                       
                                        <Link to={'reports/reportbyprojectid/'} className="btn btn-block btn-success" > Generate Excel de Reporte </Link>

                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>

 */}

                  <div className="row">
                    <div className="col-sm-12">
                      {/* Product list card start */}
                      <div className="card product-add-modal">
                        <div className="card-header">
                          <h5>Reportes por proyectos</h5>

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
                                      <th>Año</th>
                                      <th>Ver Reporte</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <label>Prespupuesto</label>
                                        <select
                                          onChange={this.onChangeSelectBudget_Atlas}
                                          className="form-control mb-3"
                                          name="presupuesto"
                                        >
                                          <option value="0">
                                            Seleccione Presupuesto{" "}
                                          </option>
                                          {this.state.budgets_atlas.map((budget) => (
                                            <option value={budget.id}>
                                              {budget.name}{" "}
                                            </option>
                                          ))}
                                        </select>
                                      </td>
                                      <td>
                                        <label>Proyecto</label>
                                        <select
                                          onChange={this.onChangeSelectProject_Atlas}
                                          className="form-control mb-3"
                                          name="proyecto"
                                        >
                                          <option value="0">
                                            Seleccione Proyecto
                                          </option>
                                          {this.state.projects_atlas.map(
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
                                          onChange={this.onChangeSelectCoin}
                                          className="form-control mb-3"
                                          name="anio"
                                        >
                                          <option value="1">LPS</option>
                                          <option value="2">Dolar</option>
                                          <option value="3">EURO</option>
                                        </select>
                                      </td>

                                      <td>
                                        <label>Año</label>
                                        <select
                                          onChange={this.onChangeSelectYear}
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
                                        {/* <button className="btn btn-block btn-primary" onClick={this.reporte_atlas_by_project} type="primary"> Generate PDF </button> */}
                                        <Link to={'reports/atlas_by_project_id/' + this.state.project_id + '/' + this.state.coin_id} className="btn btn-block btn-success" > Generate Excel de Reporte </Link>
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
      </div >
    );
  }
}
