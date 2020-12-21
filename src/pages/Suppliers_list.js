import React, { Component } from 'react'
import axios from 'axios'
export default class Supliers_list extends Component {

    constructor() {
        super();
        this.state = {
            suppliers: [],
            company: '',
            phone1: '',
            contact_name: '',
            phone2: '',
            address: '',
            email: ''

        };
    }

    async componentDidMount() {

        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        //traemos todo los proveedores registrados
        const res = await axios.get("http://167.99.15.83/api/suppliers/");
        this.setState({ suppliers: res.data.suppliers });

    }

    onChangeCompany = (e) => { this.setState({ company: e.target.value }); };
    onChangePhone1 = (e) => { this.setState({ phone1: e.target.value }); };
    onChangeAddress = (e) => { this.setState({ address: e.target.value }); };
    onChangeContactName = (e) => { this.setState({ contact_name: e.target.value }); };
    onChangePhone2 = (e) => { this.setState({ phone2: e.target.value }); };
    onChangeEmail = (e) => { this.setState({ email: e.target.value }); };

    onSubmit = async (e) => {
        e.preventDefault();
        const resp = await axios.post("http://167.99.15.83/api/suppliers", {
            company: this.state.company,
            phone1: this.state.phone1,
            address: this.state.address,
            contact_name: this.state.contact_name,
            phone2: this.state.phone2,
            email: this.state.email
        });

        window.location.href = "/suppliers_list";

    };

    onSubmitDelete = async (id) => {
        const res_p = await axios.post(
            "http://167.99.15.83/api/suppliers/delete/" + id
        );
        window.location.href = "/suppliers_list";

        if (res_p) {
        }
    };

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
                                        <h4>Gestión de Proveedores</h4>
                                    </div>
                                    <div className="page-header-breadcrumb">
                                        <ul className="breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="icofont icofont-home" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item"><a href="#!">Proveedores</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Page-header end */}
                                {/* Page-body start */}
                                <div className="page-body">
                                    <div className="card product-add-modal">
                                        <div className="card-header">
                                            <h5>Listado de los Proveedores</h5>
                                            <button
                                                type="button"
                                                className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger"
                                                data-toggle="modal"
                                                data-target="#modal_newUser"
                                            >
                                                <i className="icofont icofont-plus m-r-5" /> Crear Nuevo Proveedor
                                            </button>
                                        </div>
                                        <div className="card-block">
                                            <div className="table-content crm-table">
                                                <div className="project-table">
                                                    <table id="crm-contact" className="table table-striped nowrap">
                                                        <thead>
                                                            <tr>
                                                                <th>Image</th>
                                                                <th>Empresa</th>
                                                                <th>Teléfono</th>
                                                                <th>Nombre del Contácto</th>
                                                                <th>Celular</th>
                                                                <th>Correo</th>
                                                                <th>Acciones</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.suppliers.map((supplier) => (
                                                                <tr key={supplier.id} >
                                                                    <td>
                                                                        <img src="assets/images/avatar-2.png" className="d-inline-block img-circle " alt="tbl" />
                                                                    </td>
                                                                    <td>{supplier.company} </td>
                                                                    <td>{supplier.phone1}</td>
                                                                    <td>{supplier.contact_name}</td>
                                                                    <td>{supplier.phone2}</td>
                                                                    <td>{supplier.email}</td>
                                                                    <td className="action-icon">
                                                                        <a href="#" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                                                        <a href="#" data-toggle="modal" data-target={"#modal_delete_" + supplier.id} className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                                                    </td>

                                                                    {/* INICIO Modal DELETE*/}
                                                                    < div
                                                                        className="modal fade"
                                                                        id={"modal_delete_" + supplier.id}
                                                                        tabIndex={- 1}
                                                                        role="dialog"
                                                                    >
                                                                        <div
                                                                            className="modal-dialog modal-lg"
                                                                            role="document"
                                                                        >
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h4 className="modal-title">
                                                                                        Eliminar Proveedor:{" "}
                                                                                        ({supplier.company})-{supplier.contact_name}
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
                                                                                    <form >

                                                                                        <div
                                                                                            style={{
                                                                                                width: "100%",
                                                                                                textAlign: "center",
                                                                                                display: "inline-block",
                                                                                            }}
                                                                                        >
                                                                                            <button
                                                                                                onClick={() => this.onSubmitDelete(supplier.id)}
                                                                                                type="button"
                                                                                                className="btn btn-danger waves-effect "
                                                                                            >
                                                                                                Eliminar Este Proveedor
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>

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

                                                                    { /*FIN Modal DELETE*/}
                                                                </tr>

                                                            ))}


                                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>


                                        {/* Modal large*/}

                                        <div className="modal fade" id="modal_newUser" tabIndex={-1} role="dialog">
                                            <div className="modal-dialog modal-lg" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h4 className="modal-title">
                                                            Crear Nuevo Proveedor
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

                                                        <form onSubmit={this.onSubmit}>

                                                            <div><label>Datos de la Empresa</label></div>
                                                            <div style={{ width: "50%", display: "inline-block" }}>
                                                                <input
                                                                    required
                                                                    name="name"
                                                                    onChange={this.onChangeCompany}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Ingrese nombre de la empresa "
                                                                />
                                                            </div>
                                                            <div style={{ width: "50%", display: "inline-block" }}>
                                                                <input
                                                                    required
                                                                    name="lastname"
                                                                    onChange={this.onChangePhone1}
                                                                    type="text"
                                                                    maxLength="8"
                                                                    className="form-control"
                                                                    placeholder="Ingrese teléfono de empresa"
                                                                />
                                                            </div>

                                                            <div style={{ width: "100%", display: "inline-block" }}>
                                                                <label>Correo de la Empresa</label>
                                                                <input
                                                                    required
                                                                    name="lastname"
                                                                    onChange={this.onChangeEmail}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Ingrese Correo de la empresa info@miempresa.hn"
                                                                />
                                                            </div>
                                                            <label className="col-sm-6 col-form-label">Dirección de la Empresa</label>
                                                            <div className="form-group row">

                                                                <div className="col-sm-12">
                                                                    <textarea onChange={this.onChangeAddress} rows={5} cols={5} className="form-control" placeholder="Dirección de la Empresa" defaultValue={""} />
                                                                </div>
                                                            </div>

                                                            <div style={{ marginTop: 15 }}><label>Datos del Contácto</label></div>
                                                            <div style={{ width: "50%", display: "inline-block" }}>
                                                                <input
                                                                    required
                                                                    onChange={this.onChangeContactName}
                                                                    class="form-control "
                                                                    type="text"
                                                                    placeholder="Nombre Completo del Contácto"
                                                                />

                                                            </div>
                                                            <div style={{ width: "50%", display: "inline-block" }}>
                                                                <input
                                                                    required
                                                                    maxLength="8"
                                                                    onChange={this.onChangePhone2}
                                                                    class="form-control "
                                                                    type="text"
                                                                    placeholder="Teléfono del contácto"
                                                                />

                                                            </div>

                                                            <div className="modal-footer">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-default waves-effect "
                                                                    data-dismiss="modal"
                                                                >
                                                                    Cerrar
                                                                </button>
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-primary waves-effect waves-light "
                                                                >
                                                                    Guardar
                                                                </button>
                                                            </div>
                                                        </form>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>


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

            </div >
        )
    }
}
