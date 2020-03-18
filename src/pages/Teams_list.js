import React, { Component } from 'react'

export default class Teams_list extends Component {
    render() {
        return (
            <div>
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        {/* Main-body start */}
                        <div className="main-body">
                        <div className="page-wrapper">
                            {/* Page-header start */}
                            <div className="page-header">
                            <div className="page-header-title">
                                <h4>CRM Contact</h4>
                            </div>
                            <div className="page-header-breadcrumb">
                                <ul className="breadcrumb-title">
                                <li className="breadcrumb-item">
                                    <a href="index.html">
                                    <i className="icofont icofont-home" />
                                    </a>
                                </li>
                                <li className="breadcrumb-item"><a href="#!">CRM Contact</a>
                                </li>
                                </ul>
                            </div>
                            </div>
                            {/* Page-header end */}
                            {/* Page-body start */}
                            <div className="page-body">
                            <div className="card product-add-modal">
                                <div className="card-header">
                                <h5>Gestión de Clientes</h5>
                                <button type="button" className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger" data-modal="modal-13"> <i className="icofont icofont-plus m-r-5" /> Nuevo Cliente
                                </button>
                                </div>
                                <div className="card-block">
                                <div className="table-content crm-table">
                                    <div className="project-table">
                                    <table id="crm-contact" className="table table-striped nowrap">
                                        <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>Empresa</th>
                                            <th>Contácto</th>
                                            <th>Correo</th>
                                            <th>Teléfono 1</th>
                                            <th>Teléfono 2</th>
                                            <th>Web Site</th>
                                            <th>Ciudad</th>
                                            <th>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-1.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-2.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-3.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-5.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-4.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-1.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-2.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-3.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-4.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-5.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-1.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-2.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-3.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-4.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-5.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-1.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-2.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-3.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <img src="assets/images/avatar-5.png" className="d-inline-block img-circle " alt="tbl" />
                                            </td>
                                            <td className="pro-name">
                                                Empresa ABC
                                            </td>
                                            <td>Jorge Torres</td>
                                            <td>Sortino@domain.com</td>
                                            <td>+447662552550</td>
                                            <td>+447662552550</td>
                                            <td>empresaABC.org</td>
                                            <td>Tegucigalpa</td>
                                            <td className="action-icon">
                                            <a href="javascript:;" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                            <a href="javascript:;" className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                            </td>
                                        </tr>
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th>
                                            </th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Position</th>
                                            <th>Office</th>
                                            <th>Age</th>
                                            <th>Phone No</th>
                                            <th>Start Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                    </div>
                                </div>
                                </div>
                                {/* Add Contact Start Model */}
                                <div className="md-modal md-effect-13 addcontact" id="modal-13">
                                <div className="md-content">
                                    <h3 className="f-26">Add Contact</h3>
                                    <div>
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon1"><i className="icofont icofont-user" /></span>
                                        <input type="text" className="form-control" placeholder="Full Name" />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon2"><i className="icofont icofont-user" /></span>
                                        <input type="text" className="form-control" placeholder="Email" />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon3"><i className="icofont icofont-user" /></span>
                                        <input type="text" className="form-control" placeholder="Position" />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon4"><i className="icofont icofont-user" /></span>
                                        <input type="text" className="form-control" placeholder="Office" />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon5"><i className="icofont icofont-user" /></span>
                                        <input type="number" className="form-control" placeholder="Age" />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon6"><i className="icofont icofont-user" /></span>
                                        <input type="text" className="form-control" placeholder="Phone Number" />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon7"><i className="icofont icofont-user" /></span>
                                        <input id="dropper-default" className="form-control" type="text" placeholder="Select Your Birth Date" readOnly="readonly" />
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="btn btn-primary waves-effect m-r-20 f-w-600 d-inline-block">Save</button>
                                        <button type="button" className="btn btn-primary waves-effect m-r-20 f-w-600 md-close d-inline-block">Close</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="md-overlay" />
                                {/* Add Contact Ends Model*/}
                            </div>
                            {/* Container-fluid ends */}
                            </div>
                            {/* Page-body end */}
                        </div>
                        </div>
                        {/* Warning Section Starts */}
                        <div id="styleSelector">
                        </div>
                    </div>
                    </div>

            </div>
        )
    }
}
