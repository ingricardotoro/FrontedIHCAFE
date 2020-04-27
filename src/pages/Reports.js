import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';

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
      accounts_atlas: []
    };
  }

  // JSpdf Generator For generating the PDF
  jsPdfGenerator = () => {

    const anio = this.state.year;

    switch (this.state.coin_id) {
      case 1:
        this.setState({ modena: "Lempiras" })
        break;
      case 2:
        this.setState({ modena: "Dolares" })
        break;
      case 3:
        this.setState({ modena: "Euros" })
        break;

      default: this.setState({ modena: "Lempiras" })
        break;
    }

    // Example From https://parall.ax/products/jspdf
    var doc = new jsPDF('l', 'pt');

    //var finalY = doc.previousAutoTable.finalY
    //doc.text('From javascript arrays', 14, finalY + 15)
    doc.text('Reporte de Presupuesto ATlAS (' + anio + ') Modena:' + this.state.modena, 250, 30)

    /*doc.autoTable({
      head: headRows(),
      body: bodyRows(25),
      startY: 40,
      head: [['Descripción', 'Cuenta Atlas', 'Q1', 'Ejer.', 'Q2', 'Ejer.', 'Q3', 'Ejer.', 'Q4', 'Ejer']],
      body: [
        Object.keys(this.state.accounts_atlas).map((cuenta) => {
          ['id', 'MARVIN', 'MARVIN', 'MARVIN', 'MARVIN', 'MARVIN', 'MARVIN', 'MARVIN', 'MARVIN', 'MARVIN', 'MARVIN',]
        })
      ],
    })*/

    doc.autoTable({
      head: headRows(),
      body: bodyRows(this.state.budgetLinesAtlas),
      startY: 50,
      showHead: 'firstPage',
    })

    function headRows() {
      return [
        { id: 'id', name: 'name', balance: 'balance' }
        //{ id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
      ]
    }

    function bodyRows(budgetLinesAtlas) {
      var body = []

      //recorrido de cada gasto de este proyecto
      for (let index = 0; index < budgetLinesAtlas.length; index++) {

        body.push({
          id: budgetLinesAtlas[index].id,
          name: budgetLinesAtlas[index].atlas_account.details,
          balance: budgetLinesAtlas[index].balance,
        })

      }


      //recorremos todos los gastos de este proyecto
      /*Object.keys(this.state.budgetLinesAtlas).map((budg_line) => {
        if (budg_line === "Aprobado") {
          this.state.total_ejecutado += this.state.budg_line.balance;

            }
          })
        })*/

      return body
    }


    // Save the Data
    doc.save('Generated'.pdf);
  }



  async componentDidMount() {

    const res = await axios.get("http://167.99.15.83:4000/api/budgets/");
    this.setState({ budgets: res.data.budgets });

    const res_atlas = await axios.get("http://167.99.15.83:4000/api/budgets/atlas");
    this.setState({ budgets_atlas: res_atlas.data.budgets });

    const res_account_atlas = await axios.get(
      "http://167.99.15.83:4000/api/atlas/accounts"
    );
    this.setState({ accounts_atlas: res_account_atlas.data.atlas_accounts });



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

  onChangeSelectBudget_Atlas = async (e) => {
    this.setState({ budget_atlas_id: e.target.value });

    const res_pro_atlas = await axios.post(
      "http://167.99.15.83:4000/api/projects/findProjectsByBudgetId/" +
      e.target.value
    );
    this.setState({ projects_atlas: res_pro_atlas.data.projectsbybudgetid });

    this.state.projects_atlas.map(async (p_atlas) => {
      //llamamos los gastos hechos en este proyecto y presupuesto
      const res = await axios.post(
        "http://167.99.15.83:4000/api/budgetlines/atlas/project/" + p_atlas.id
      );
      this.setState({ budgetLinesAtlas: res.data.budgetLines_atlas });

      //recorremos todos los gastos de este proyecto
      Object.keys(this.state.budgetLinesAtlas).map((budg_line) => {
        if (budg_line === "Aprobado") {
          this.state.total_ejecutado += this.state.budg_line.balance;

        }
      })
    })
  };

  onChangeSelectProject = async (e) => {
    this.setState({ project_id: e.target.value });
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

  /*Metodo HandleGlobal*/
  //handleChange = ({ target: {value,name} }) => this.setState({ [name]: value})

  /*handleClick = () => {
    axios.post('http://167.99.15.83:4000/api/reports/create-pdf', this.state)
      .then(() => axios.get('http://167.99.15.83:4000/api/reports/fetch-pdf', { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }*/

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
                                        {/* <Link
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
                                        </Link> */}
                                        <button className="btn btn-block btn-primary" onClick={this.jsPdfGenerator} type="primary"> Generate PDF </button>
                                        {/*  <button
                                          onClick={this.handleClick}
                                          className="btn btn-block btn-primary"
                                        >
                                          Generar
                                        </button> */}

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
                                        {/* <Link
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
                                        </Link> */}
                                        <button className="btn btn-block btn-primary" onClick={this.jsPdfGenerator} type="primary"> Generate PDF </button>
                                        {/*  <button
                                          onClick={this.handleClick}
                                          className="btn btn-block btn-primary"
                                        >
                                          Generar
                                        </button> */}

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
