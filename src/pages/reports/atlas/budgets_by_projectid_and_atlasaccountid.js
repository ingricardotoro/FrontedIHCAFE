import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../config/api';

export default class ReportAtlasByProjectid extends Component {
  constructor() {
    super();
    this.state = {
      ArrayReporteBudgetsByProjectIdByAccountId: [],
      total_ejecutado: 0,
      total_solicitado: 0,
      sub_account: '',
    };
  }

  async componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = '/';
    }

    const res = await axios.get(
      API_URL +
        '/budgetlines/atlas/budgets_by_projectid_and_atlasaccountid/' +
        this.props.match.params.project_id +
        '/' +
        this.props.match.params.account_atlas +
        '/' +
        this.props.match.params.coin_id +
        '/' +
        this.props.match.params.year
    );

    this.setState({
      ArrayReporteBudgetsByProjectIdByAccountId:
        res.data.ArrayReporteBudgetsByProjectIdByAccountId,
    });
  }

  SubCaterogia(id) {
    fetch(API_URL + '/atlas/find_sub_atlas_category/' + id)
      .then((response) => {
        return response.json();
      })
      .then((recurso) => {
        this.setState({ sub_account: recurso.sub_accounts.name });
      });

    return this.state.sub_account;
  }

  formatMoney(number) {
    if (this.props.match.params.coin_id == 1) {
      return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'HNL',
      });
    }

    if (this.props.match.params.coin_id == 2) {
      return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    }
    //return number;
  }

  render() {
    return (
      <div>
        <div className="pcoded-content">
          <div className="pcoded-inner-content">
            {/* Main-body start */}
            <div className="main-body">
              <div className="page-wrapper">
                {/* Page-header start */}
                <div className="page-header mt-5">
                  <div className="page-header-title">
                    <button
                      className="btn btn-block btn-success"
                      onClick={() =>
                        exportTableToExcel('report', 'Reporte por Proyecto')
                      }
                      type="primary"
                    >
                      Exportar en Excel{' '}
                    </button>
                  </div>
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="icofont icofont-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to={'/reports_atlas'}>Volver a Reportes</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Page-header end */}
                {/* Page-body start */}
                <div className="page-body">
                  <div className="card product-add-modal">
                    <div className="card-header">
                      <h5>Reporte Gastos</h5>
                    </div>
                    <div className="card-block">
                      <div className="table-content crm-table">
                        <div className="project-table">
                          <table
                            id="report"
                            className="table table-striped nowrap"
                          >
                            <thead>
                              <tr>
                                <th style={{ border: '1px solid' }}>
                                  Correlativo
                                </th>
                                <th style={{ border: '1px solid' }}>
                                  Sub Caategoría
                                </th>
                                <th style={{ border: '1px solid' }}>Fecha</th>
                                <th style={{ border: '1px solid' }}>Valor</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.ArrayReporteBudgetsByProjectIdByAccountId.map(
                                (Item) => (
                                  <tr
                                    key={Item.id}
                                    style={{ border: '1px solid' }}
                                  >
                                    <td style={{ border: '1px solid' }}>
                                      {Item.code}{' '}
                                    </td>
                                    <td style={{ border: '1px solid' }}>
                                      {this.SubCaterogia(Item.code_sub_atlas)}
                                    </td>
                                    <td style={{ border: '1px solid' }}>
                                      {Item.date_start}
                                    </td>
                                    <td style={{ border: '1px solid' }}>
                                      {this.formatMoney(Item.balance)}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Container-fluid ends */}
                </div>
                {/* Page-body end */}
              </div>
            </div>
            {/* Warning Section Starts */}
            <div id="styleSelector"></div>
          </div>
        </div>
      </div>
    );
  }
}

function exportTableToExcel(tableID, filename = '') {
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

  // Specify file name
  filename = filename ? filename + '.xls' : 'excel_data.xls';

  // Create download link element
  downloadLink = document.createElement('a');

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHTML], {
      type: dataType,
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }
}
