import React, { Component } from 'react'
import axios from 'axios'
export default class Users_list extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            tipousuarios: [],
            password: '',
            username: '',
            name: '',
            lastname: '',
            tipo_user: 0

        };
    }

    async componentDidMount() {

        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        //traemos todo los usuario registrados
        const res = await axios.get("http://167.99.15.83:4000/api/users/");
        this.setState({ users: res.data.users });

        //traemos los tipo de usuarios de la tabla tipousuario
        const res2 = await axios.get("http://167.99.15.83:4000/api/tipousers/");
        this.setState({ tipousuarios: res2.data.tipousers });

    }

    onChangePassword = (e) => { this.setState({ password: e.target.value }); };
    onChangeUsername = (e) => { this.setState({ username: e.target.value }); };
    onChanceLastName = (e) => { this.setState({ lastname: e.target.value }); };
    onChanceName = (e) => { this.setState({ name: e.target.value }); };
    onChanceTipoUsuario = (e) => { this.setState({ tipo_user: e.target.value }); };

    onSubmit = async (e) => {
        e.preventDefault();
        const resp = await axios.post("http://167.99.15.83:4000/api/users/register", {
            lastname: this.state.lastname,
            name: this.state.name,
            tipo_user_id: this.state.tipo_user,
            username: this.state.username,
            password: this.state.password
        });
        window.location.href = "/users_list";

    };

    onSubmitDelete = async (id) => {
        const res_p = await axios.post(
            "http://167.99.15.83:4000/api/users/delete/" + id
        );
        window.location.href = "/users_list";

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
                                        <h4>Usuario del Sistema</h4>
                                    </div>
                                    <div className="page-header-breadcrumb">
                                        <ul className="breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="icofont icofont-home" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item"><a href="#!">Usuarios</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Page-header end */}
                                {/* Page-body start */}
                                <div className="page-body">
                                    <div className="card product-add-modal">
                                        <div className="card-header">
                                            <h5>Gestión de usuarios</h5>
                                            <button
                                                type="button"
                                                className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger"
                                                data-toggle="modal"
                                                data-target="#modal_newUser"
                                            >
                                                <i className="icofont icofont-plus m-r-5" /> Crear Nuevo Usuario
                                            </button>
                                        </div>
                                        <div className="card-block">
                                            <div className="table-content crm-table">
                                                <div className="project-table">
                                                    <table id="crm-contact" className="table table-striped nowrap">
                                                        <thead>
                                                            <tr>
                                                                <th>Foto</th>
                                                                <th>Nombre</th>
                                                                <th>Apellido</th>
                                                                <th>Usuario</th>
                                                                <th>Tipo de usuario</th>
                                                                <th>Fecha de Creación</th>
                                                                <th>Acciones</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.users.map((user) => (
                                                                <tr>
                                                                    <td>
                                                                        <img src="assets/images/avatar-2.png" className="d-inline-block img-circle " alt="tbl" />
                                                                    </td>
                                                                    <td>{user.name} </td>
                                                                    <td>{user.lastname}</td>
                                                                    <td>{user.username}</td>
                                                                    <td>{user.tipouser.tipo_user}</td>
                                                                    <td>{user.createdAt}</td>

                                                                    <td className="action-icon">
                                                                        <a href="#" className="m-r-15 crm-action-edit text-muted"><i className="icofont icofont-ui-edit" /></a>
                                                                        <a href="#" data-toggle="modal" data-target={"#modal_delete_" + user.id} className="crm-action-delete text-muted"><i className="icofont icofont-delete-alt" /></a>
                                                                    </td>

                                                                    {/* INICIO Modal DELETE*/}
                                                                    < div
                                                                        className="modal fade"
                                                                        id={"modal_delete_" + user.id}
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
                                                                                        Eliminar Usuario:{" "}
                                                                                        ({user.name})-{user.last_name}
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
                                                                                                onClick={() => this.onSubmitDelete(user.id)}
                                                                                                type="button"
                                                                                                className="btn btn-danger waves-effect "
                                                                                            >
                                                                                                Eliminar Este usuario
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
                                                            Crear Nuevo usuario
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

                                                            <div style={{ width: "100%", display: "inline-block", paddingBottom: 15 }}>
                                                                <select
                                                                    required
                                                                    onChange={this.onChanceTipoUsuario}
                                                                    name="select"
                                                                    className="form-control mt-3"
                                                                >
                                                                    <option value="#">Seleccione Tipo de Usuario</option>
                                                                    {this.state.tipousuarios.map((tipousuario) => (
                                                                        <option value={tipousuario.id}>
                                                                            {tipousuario.tipo_user}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>


                                                            <div><label>Datos personales del usuario</label></div>
                                                            <div style={{ width: "50%", display: "inline-block" }}>
                                                                <input
                                                                    required
                                                                    name="name"
                                                                    onChange={this.onChanceName}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Ingrese nombre de usuario "
                                                                />
                                                            </div>
                                                            <div style={{ width: "50%", display: "inline-block" }}>
                                                                <input
                                                                    required
                                                                    name="lastname"
                                                                    onChange={this.onChanceLastName}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Ingrese apellido de usuario"
                                                                />
                                                            </div>

                                                            <div style={{ marginTop: 15 }}><label>Datos del Acceso</label></div>
                                                            <div style={{ width: "50%", display: "inline-block" }}>
                                                                <input
                                                                    required
                                                                    onChange={this.onChangeUsername}
                                                                    class="form-control "
                                                                    type="text"
                                                                    placeholder="ingrese cuenta de usuario"
                                                                />

                                                            </div>
                                                            <div style={{ width: "50%", display: "inline-block" }}>
                                                                <input
                                                                    required
                                                                    onChange={this.onChangePassword}
                                                                    class="form-control "
                                                                    type="password"
                                                                    placeholder="Ingrese clave de usuario"
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
