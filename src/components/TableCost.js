import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link, Redirect, useHistory } from "react-router-dom";

import RowCardsProjects from "./RowCardsProjects";
import ModalVerFiles from "./ModalVerFiles";

function TableCost(props) {

    const { idProject, budget_id } = props

    const [budgetLines, setBudgetLines] = useState([])
    const [budgetLinesCat, setBudgetLinesCat] = useState([])
    const [projects, setProjects] = useState([])
    const [categories, setCategories] = useState([])
    const [clasificaciones, setClasificaciones] = useState([])
    const [cuentas, setCuentas] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [archivo, setaArchivo] = useState([])

    const [total_disponible, setTotal_disponible] = useState(0)
    const [total_ejecutado, setTotal_ejecutado] = useState(0)
    const [total_inicial, setTotal_inicial] = useState(0)
    const [total_rembolsos, setTotal_rembolsos] = useState(0)
    const [porcentaje_disponible, setPorcentaje_disponible] = useState(0)
    const [porcentaje_ejecutado, setPorcentaje_ejecutado] = useState(0)
    const [porcentaje_rembolsos, setPorcentaje_rembolsos] = useState(0)
    const [porcentaje_solicitado, setPorcentaje_solicitado] = useState(0)
    const [total_solicitado, setTotal_solicitado] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [aprobar, setAprobar] = useState(1)
    const [valor, setValor] = useState(-1)
    const [comentario, setComentario] = useState("")
    const [nombre_archivo, setNombre_archivo] = useState("")
    const [fase_archivo, setFase_archivo] = useState("")
    const [variable, setVariable] = useState(0)
    const [bdg_start_project, setBdg_start_project] = useState(0)
    const [redirect, setRedirect] = useState(false)

    const [budgetLine, setBudgetLine] = useState({
        code: "",
        name: "",//
        project_id: 0,//
        category_id: 0,//
        sub_category_code: "",//
        user_id: 1,
        status: "Solicitado",
        supplier_id: 1,
        startdate: "",//
        enddate: "",//
        account_id: 0,
        budgetstart: 0.0,//
        budgeupdate: 0.0,
        budgetfinal: 0.0,
        balance: 0.0,//
        description: ""
    })

    let history = useHistory()

    useEffect(() => {

        if (!localStorage.usertoken) {
            history.push('/')
            //window.location.href = "/"
        }

        getData()
        calculo();

    }, [])

    const getData = async () => {

        const res = await axios.post(
            "http://167.99.15.83:4000/api/budgetlines/project/" + idProject
        );
        setBudgetLines(res.data.budgetLines)
        //this.setState({ budgetLines: res.data.budgetLines });

        const res3 = await axios.get("http://167.99.15.83:4000/api/projects/");
        //this.setState({ projects: res3.data.projects });
        setProjects(res3.data.projects)
        //obtenemos el budgetstart de este proyecto
        const res_pro = await axios.get(
            "http://167.99.15.83:4000/api/projects/" + idProject
        );
        //this.setState({ bdg_start_project: res_pro.data.data.budgetstart });
        setBdg_start_project(res_pro.data.data.budgetstart)

        const res4 = await axios.get(
            "http://167.99.15.83:4000/api/categories/categories_parents/"
        );
        //this.setState({ categories: res4.data.categories });
        setCategories(res4.data.categories)

        const res6 = await axios.get("http://167.99.15.83:4000/api/accounts/");
        //this.setState({ cuentas: res6.data.cuentas });
        setCuentas(res6.data.cuentas)

        const res_suppliers = await axios.get(
            "http://167.99.15.83:4000/api/suppliers/"
        );
        //this.setState({ suppliers: res_suppliers.data.suppliers });
        setSuppliers(res_suppliers.data.suppliers)

        //this.setState({ project_id: this.props.idProject });
        setBudgetLine({
            ...budgetLine,
            project_id: idProject
        })
    }

    const onChanceCategory = async (e) => {
        setBudgetLine({
            ...budgetLine,
            category_id: e.target.value
        })
        //this.setState({ category_id: e.target.value });
        const res5 = await axios.get(
            "http://167.99.15.83:4000/api/categories/categories_childs/" +
            e.target.value
        );
        //this.setState({ clasificaciones: res5.data.clasificaciones });
        setClasificaciones(res5.data.clasificaciones)
    }

    const calculo = () => {
        // para realizar el calculo de la suma de presupuestos
        setTotal_inicial(0.0)
        setTotal_ejecutado(0.0)
        setTotal_disponible(0.0)
        setTotal_solicitado(0.0)
        let sumaTotoalSolicitado = 0.0
        let sumaTotoalEjecutado = 0.0
        let totoalDisponible = 0.0
        budgetLines.map((bl) => {

            if (bl.status === 'Solicitado') {
                sumaTotoalSolicitado += parseFloat(bl.balance)
            }
            if (bl.status === 'Aprobado') {
                sumaTotoalEjecutado += parseFloat(bl.balance)
            }
        })

        totoalDisponible = parseFloat(bdg_start_project) - parseFloat(sumaTotoalEjecutado)

        setTotal_solicitado(sumaTotoalSolicitado)
        setTotal_ejecutado(sumaTotoalEjecutado)
        setTotal_disponible(parseFloat(bdg_start_project) - parseFloat(sumaTotoalEjecutado))

        setPorcentaje_ejecutado((sumaTotoalEjecutado * 100) / parseFloat(bdg_start_project))
        setPorcentaje_disponible((totoalDisponible * 100) / parseFloat(bdg_start_project))
        setPorcentaje_solicitado((sumaTotoalSolicitado * 100) / parseFloat(bdg_start_project))

    }

    const onChanceClasificacion = async (e) => {
        let valorx = e.target.value

        const res7 = await axios.get(
            "http://167.99.15.83:4000/api/categories/child/" + valorx
        );
        setBudgetLine({
            ...budgetLine,
            name: res7.data.child.name,
            sub_category_code: valorx
        })
    }

    const onChangeStartDate = (e) => {
        setBudgetLine({
            ...budgetLine,
            startdate: e.target.value,
        })
    }

    const onChangeEndDate = (e) => {
        setBudgetLine({
            ...budgetLine,
            enddate: e.target.value,
        })
    }

    const onChanceCode = (e) => {
        setBudgetLine({
            ...budgetLine,
            code: e.target.value,
        })
    }

    const onChanceAccount = (e) => {
        setBudgetLine({
            ...budgetLine,
            account_id: e.target.value,
        })
    }

    const onChanceBudget = (e) => {
        setBudgetLine({
            ...budgetLine,
            budgetstart: e.target.value,
            balance: e.target.value,
        })
    }

    const onchangeComentario = (e) => {
        setComentario(e.target.value)
    }

    const onchangeMonto = (e) => {
        setValor(e.target.value)
    }

    const onchangeSelectAprobar = (e) => {
        setBudgetLine({
            ...budgetLine,
            aprobar: e.target.value,
        })
    }

    const onChanceSupplier = (e) => {
        //setSupplier(e.target.value)
        setBudgetLine({
            ...budgetLine,
            supplier_id: e.target.value
        })
    }

    const onChanceDescription = (e) => {
        setBudgetLine({
            ...budgetLine,
            description: e.target.value
        })
    }

    const formatMoney = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "HNL",
        });
        //return number;
    }

    const onClickAprobar = async (id, maximo) => {
        /*if (valor === -1) {
            setValor(maximo)
        }*/

        if (budgetLine.balance <= maximo) {
            // si es aprobado un valor igual o menor
            console.log("http://167.99.15.83:4000/api/budgetlines/aprobar/" +
                id + "/" + aprobar + "/" + valor + "/" + comentario)
            let res = await axios.post(
                "http://167.99.15.83:4000/api/budgetlines/aprobar/" +
                id + "/" + aprobar + "/" + valor + "/" + comentario
            )

            console.log("APROBANDO" + JSON.stringify(res))
            window.location.replace('/project/' + this.props.idProject);

            //history.push('/project/' + idProject)
            //this.setState({ redirect: true })
            //window.location.replace('/project/' + this.props.idProject);
            //window.location.replace('');

        } else {
            alert("Valor No Valido");
        }
    }

    const onClickArchivo = async (e) => {
        setaArchivo(e.target.value)
    }

    const onClickNombreArchivo = async (e) => {
        setNombre_archivo(e.target.value)
    }

    const onClickFaseArchivo = async (e) => {
        setFase_archivo(e.target.value)
    }

    onClickSubirArchivo = async (id) => {
        await axios.post("http://167.99.15.83:4000/api/files/" + id, {
            nombre_archivo: this.state.nombre_archivo,
            fase_archivo: this.state.fase_archivo,
            file: this.state.archivo,
        })
        window.location.replace('/project/' + this.props.idProject);

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://167.99.15.83:4000/api/budgetlines/", {
            code: budgetLine.code,
            description: budgetLine.description,
            name: budgetLine.name,
            status: budgetLine.status,
            project_id: budgetLine.project_id,
            user_id: budgetLine.user_id,
            supplier_id: supplier,
            date_start: budgetLine.startdate,
            date_end: budgetLine.enddate,
            account_id: budgetLine.account_id,
            buddgetstart: budgetLine.budgetstart,
            buddgeupdate: budgetLine.budgeupdate,
            buddgetfinal: budgetLine.budgetfinal,
            balance: budgetLine.budgetstart,
            category_id: budgetLine.category_id,
            sub_category_code: budgetLine.sub_category_code,
        })

        //console.log("RES=" + JSON.stringify(res.data.status))
        //history.replace('/project/' + idProject)
        window.location.replace('/project/' + this.props.idProject);
    }

    const onSubmitDelete = async (id) => {
        const res_p = await axios.post(
            "http://167.99.15.83:4000/api/budgetlines/delete/" + id
        );

        //window.location.replace('');
        window.location.replace('/project/' + this.props.idProject);

        //history.push('/project/' + idProject);

        if (res_p) {
        }
    }

    return (
        <div>
            <RowCardsProjects
                inicial={bdg_start_project}
                //inicial={total_inicial}
                ejecutado={total_ejecutado}
                disponible={total_disponible}
                solicitado={total_solicitado}
                //rembolsos={total_rembolsos}
                porcentaje_ejecutado={porcentaje_ejecutado}
                porcentaje_disponible={porcentaje_disponible}
                porcentaje_solicitado={porcentaje_solicitado}
            //porcentaje_rembolsos={this.state.porcentaje_rembolsos}
            />

            {/* Page body start */}
            <div className="page-body">
                <div className="row">
                    <div className="col-sm-12">
                        {/* Product list card start */}
                        <div className="card product-add-modal">
                            <div className="card-header">
                                <h5>Renglones Presupuestarios </h5>

                                <button
                                    type="button"
                                    className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger"
                                    data-toggle="modal"
                                    data-target="#modal-13"
                                >
                                    <i className="icofont icofont-plus m-r-5" /> Crear Nuevo
                </button>
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
                                                        <th>Código</th>
                                                        <th>Nombre</th>
                                                        <th>Valor</th>
                                                        <th>Fecha</th>
                                                        <th>Estado</th>
                                                        <th>Rembolsar</th>
                                                        <th>Archivos</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {budgetLines !== undefined
                                                        ? budgetLines.map((budgetLine) => (
                                                            <tr key={budgetLine.id}>
                                                                <td className="pro-name">
                                                                    <label className="text-danger">
                                                                        {budgetLine.code}
                                                                    </label>
                                                                </td>
                                                                <td className="pro-name">
                                                                    <h6>{budgetLine.name}</h6>
                                                                </td>

                                                                <td>
                                                                    <label className="text-info">
                                                                        {formatMoney(budgetLine.balance)}
                                                                    </label>
                                                                </td>

                                                                <td>
                                                                    <label className="text-danger">
                                                                        {" "}
                                                                        {formatMoney(
                                                                            moment(budgetLine.date_start).format(
                                                                                "DD/MM/YYYY"
                                                                            )
                                                                        )}
                                                                    </label>
                                                                </td>

                                                                {budgetLine.status === "Solicitado" ? (
                                                                    <td>
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-success waves-effect"
                                                                            data-toggle="modal"
                                                                            data-target={
                                                                                "#aprobar_" + budgetLine.id
                                                                            }
                                                                        >
                                                                            Decidir
                                    </button>{" "}
                                                                    </td>
                                                                ) : (
                                                                        <td>
                                                                            <label>{budgetLine.status}</label>
                                                                        </td>
                                                                    )}

                                                                {budgetLine.status === "Aprobado" ? (
                                                                    <td>
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-warning waves-effect"
                                                                            data-toggle="modal"
                                                                            data-target={
                                                                                "#rembolsar_" + budgetLine.id
                                                                            }
                                                                        >
                                                                            Rembolsar
                                    </button>
                                                                    </td>
                                                                ) : (
                                                                        <td align="center">
                                                                            <label>---</label>
                                                                        </td>
                                                                    )}

                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-primary waves-effect"
                                                                        data-toggle="modal"
                                                                        data-target={
                                                                            "#ver_archivos_" + budgetLine.id
                                                                        }
                                                                    >
                                                                        Ver
                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-success waves-effect"
                                                                        data-toggle="modal"
                                                                        data-target={
                                                                            "#archivos_" + budgetLine.id
                                                                        }
                                                                    >
                                                                        Subir
                                    </button>
                                                                </td>
                                                                <td align="center" className="action-icon">
                                                                    < Link
                                                                        to={"/budgetline/edit/" + idProject + "/" + budgetLine.id}
                                                                        className="m-r-15 text-muted"
                                                                        data-original-title="Edit"
                                                                    >
                                                                        <i className="icofont icofont-ui-edit"
                                                                        ></i>
                                                                    </Link>

                                                                    <a
                                                                        href="#!"
                                                                        className="text-muted"
                                                                        data-original-title="Eliminar"
                                                                    >
                                                                        <i
                                                                            className="icofont icofont-delete-alt"
                                                                            data-toggle="modal"
                                                                            data-target={
                                                                                "#modal_delete_" + budgetLine.id
                                                                            }
                                                                        ></i>
                                                                    </a>
                                                                </td>

                                                                {/* INICIL Modal DELETE*/}

                                                                < div
                                                                    className="modal fade"
                                                                    id={"modal_delete_" + budgetLine.id}
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
                                                                                    Eliminar Presupuesto:{" "}
                                                                                    {budgetLine.name}{" "}
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
                                                                                <form
                                                                                    onSubmit={() =>
                                                                                        onSubmitDelete(
                                                                                            budgetLine.id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <div
                                                                                        style={{
                                                                                            width: "100%",
                                                                                            textAlign: "center",
                                                                                            display: "inline-block",
                                                                                        }}
                                                                                    >
                                                                                        <button
                                                                                            type="submit"
                                                                                            className="btn btn-danger waves-effect "
                                                                                        >
                                                                                            Eliminar Este Renglón
                                                                                            Presupuestario
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

                                                                {/*FIN Modal DELETE*/}

                                                                <div
                                                                    class="modal fade"
                                                                    id={"aprobar_" + budgetLine.id}
                                                                    tabIndex="-1"
                                                                    role="dialog"
                                                                >
                                                                    <div
                                                                        class="modal-dialog modal-lg"
                                                                        role="document"
                                                                    >
                                                                        <div class="modal-content">
                                                                            <div class="modal-header">
                                                                                <h4 class="modal-title">
                                                                                    Monto:{" "}
                                                                                    {formatMoney(
                                                                                        budgetLine.balance
                                                                                    )}{" "}
                                                                                </h4>
                                                                                <button
                                                                                    type="button"
                                                                                    class="close"
                                                                                    data-dismiss="modal"
                                                                                    aria-label="Close"
                                                                                >
                                                                                    <span aria-hidden="true">
                                                                                        &times;
                                            </span>
                                                                                </button>
                                                                            </div>
                                                                            <form>
                                                                                <div class="modal-body">
                                                                                    <p class="modal-title">
                                                                                        Descripción:{" "}
                                                                                        {budgetLine.description}
                                                                                    </p>

                                                                                    <select
                                                                                        onChange={
                                                                                            onchangeSelectAprobar
                                                                                        }
                                                                                        name="select"
                                                                                        className="form-control mt-3"
                                                                                    >
                                                                                        <option value="1">
                                                                                            Si Aprobar
                                            </option>
                                                                                        <option value="1">
                                                                                            SI APROBAR
                                            </option>
                                                                                        <option value="2">
                                                                                            NO APROBAR
                                            </option>
                                                                                    </select>

                                                                                    <label>Monto A Aprobar</label>
                                                                                    <input
                                                                                        onChange={onchangeMonto}
                                                                                        name="monto"
                                                                                        type="text"
                                                                                        className="form-control mb-3"
                                                                                        value={budgetLine.valor}
                                                                                    />

                                                                                    <label>Comentarios</label>
                                                                                    <textarea
                                                                                        onChange={
                                                                                            onchangeComentario
                                                                                        }
                                                                                        name="comentario"
                                                                                        className="form-control"
                                                                                    ></textarea>
                                                                                </div>
                                                                                <div class="modal-footer">
                                                                                    <button
                                                                                        type="button"
                                                                                        class="btn btn-default waves-effect "
                                                                                        data-dismiss="modal"
                                                                                    >
                                                                                        Cerrar
                                            </button>
                                                                                    <button
                                                                                        type="submit"
                                                                                        onClick={() =>
                                                                                            onClickAprobar(
                                                                                                budgetLine.id,
                                                                                                budgetLine.balance
                                                                                            )
                                                                                        }
                                                                                        class="btn btn-primary waves-effect waves-light "
                                                                                    >
                                                                                        Guardar
                                            </button>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <ModalVerFiles

                                                                    budget_id={budget_id}
                                                                    idProject={idProject}
                                                                    budgetline={budgetLine.id}
                                                                    budgetlineName={budgetLine.name}
                                                                    budgetlineDetails={budgetLine.description}
                                                                />

                                                                {/* SUBIR Archivos */}
                                                                <div
                                                                    class="modal fade"
                                                                    id={"archivos_" + budgetLine.id}
                                                                    tabindex="-1"
                                                                    role="dialog"
                                                                >
                                                                    <div
                                                                        class="modal-dialog modal-lg"
                                                                        role="document"
                                                                    >
                                                                        <div class="modal-content">
                                                                            <div class="modal-header">
                                                                                <h4 class="modal-title">
                                                                                    {budgetLine.name}-
                                            {formatMoney(
                                                                                        budgetLine.balance
                                                                                    )}{" "}
                                                                                </h4>
                                                                                <button
                                                                                    type="button"
                                                                                    class="close"
                                                                                    data-dismiss="modal"
                                                                                    aria-label="Close"
                                                                                >
                                                                                    <span aria-hidden="true">
                                                                                        &times;
                                            </span>
                                                                                </button>
                                                                            </div>
                                                                            <form
                                                                                action={
                                                                                    "http://167.99.15.83:4000/api/files/"
                                                                                }
                                                                                method="post"
                                                                                encType="multipart/form-data"
                                                                            >
                                                                                <div class="modal-body">
                                                                                    <div className="form-control mt-3">
                                                                                        <input
                                                                                            onChange={onClickArchivo}
                                                                                            type="file"
                                                                                            name="archivo"
                                                                                        ></input>
                                                                                    </div>
                                                                                    <input
                                                                                        value={budgetLine.id}
                                                                                        name="budgetline_id"
                                                                                        type="hidden"
                                                                                        className="form-control"
                                                                                    />
                                                                                    <input
                                                                                        value={budget_id}
                                                                                        name="budget_id"
                                                                                        type="hidden"
                                                                                        className="form-control"
                                                                                    />
                                                                                    <input
                                                                                        value={idProject}
                                                                                        name="project_id"
                                                                                        type="hidden"
                                                                                        className="form-control"
                                                                                    />

                                                                                    <div className="form-control mt-3">
                                                                                        <input
                                                                                            name="file_name"
                                                                                            onChange={
                                                                                                onClickNombreArchivo
                                                                                            }
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            placeholder="Ingrese Nombre de Archivo "
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <select
                                                                                            onChange={
                                                                                                onClickFaseArchivo
                                                                                            }
                                                                                            name="fase"
                                                                                            className="form-control mt-3"
                                                                                        >
                                                                                            <option value="0">
                                                                                                Seleccion Fase
                                                </option>
                                                                                            <option value="Solicitud">
                                                                                                Solicitud
                                                </option>
                                                                                            <option value="Desembolso">
                                                                                                Desembolso
                                                </option>
                                                                                            <option value="Liquidacion">
                                                                                                Liquidacion
                                                </option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="modal-footer">
                                                                                    <button
                                                                                        type="button"
                                                                                        class="btn btn-default waves-effect "
                                                                                        data-dismiss="modal"
                                                                                    >
                                                                                        Cerrar
                                            </button>
                                                                                    {/* <button type="button" onClick={ () =>this.onClickSubirArchivo(budgetLines.id )} class="btn btn-primary waves-effect waves-light ">Guardar</button> */}
                                                                                    <button
                                                                                        type="submit"
                                                                                        class="btn btn-primary waves-effect waves-light "
                                                                                    >
                                                                                        Guardar
                                            </button>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* FINAL DE SUBIR ARCHIVOS */}

                                                                <div
                                                                    class="modal fade"
                                                                    id={"rembolsar_" + budgetLine.id}
                                                                    tabindex="-1"
                                                                    role="dialog"
                                                                >
                                                                    <div
                                                                        class="modal-dialog modal-lg"
                                                                        role="document"
                                                                    >
                                                                        <div class="modal-content">
                                                                            <div class="modal-header">
                                                                                <h4 class="modal-title">
                                                                                    Rembolsar {budgetLine.name}-
                                            {formatMoney(
                                                                                    budgetLine.balance
                                                                                )}{" "}
                                                                                </h4>
                                                                                <button
                                                                                    type="button"
                                                                                    class="close"
                                                                                    data-dismiss="modal"
                                                                                    aria-label="Close"
                                                                                >
                                                                                    <span aria-hidden="true">
                                                                                        &times;
                                            </span>
                                                                                </button>
                                                                            </div>
                                                                            <div
                                                                                class="modal-body"
                                                                                align="center"
                                                                            >
                                                                                <div>
                                                                                    <label htmlFor="">
                                                                                        Descripción del Rembolso
                                            </label>
                                                                                    <textarea
                                                                                        className="form-control"
                                                                                        style={{ width: "100%" }}
                                                                                        id=""
                                                                                        cols="30"
                                                                                        rows="10"
                                                                                    ></textarea>
                                                                                </div>
                                                                                <input
                                                                                    type="hidden"
                                                                                    name={
                                                                                        "input_rembolsar_" +
                                                                                        budgetLine.id
                                                                                    }
                                                                                    value={budgetLine.id}
                                                                                />
                                                                                <div className="mt-3">
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-primary waves-effect waves-light "
                                                                                    >
                                                                                        Reembolsar
                                            </button>
                                                                                </div>
                                                                            </div>
                                                                            <div class="modal-footer">
                                                                                <button
                                                                                    type="button"
                                                                                    class="btn btn-default waves-effect "
                                                                                    data-dismiss="modal"
                                                                                >
                                                                                    Cerrar
                                        </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </tr>
                                                        ))
                                                        : null}

                                                    {/*  <tr>
                                    <td align="center" className="pro-name">
                                        <label className="text-danger">---</label>
                                    </td>
                                    <td className="pro-name">
                                        <h6>Total de Prespuesto APROBADO</h6>
                                        <span>Suma de los Totales</span>
                                    </td>
                                    
                                    <td>
                                        <label className="text-info">{this.formatMoney(this.state.total_inicial)}</label>
                                    </td>
                                    <td>
                                        <label className="text-danger">{this.formatMoney(this.state.total_ejecutado)}</label>
                                    </td>
                                    <td>
                                        <label className="text-success">{this.formatMoney(this.state.total_disponible)}</label>
                                    </td>
                                    <td align="center">
                                        <label >---</label>
                                    </td>
                                    <td align="center">
                                        <label  >---</label>
                                    </td>
                                    <td align="center">
                                        <label  >---</label>
                                    </td>
                                
                                    <td className="action-icon"> 
                                        
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" className="pro-name">
                                        <label className="text-danger">---</label>
                                    </td>
                                    <td className="pro-name">
                                        <h6>Total de Prespuesto SOLICITADO</h6>
                                        <span>Suma de los Totales</span>
                                    </td>
                                    
                                    <td>
                                            <label>{this.formatMoney(this.state.total_solicitado)}</label> 
                                    </td>
                                    <td align="center">
                                        <label className="text-info">---</label>
                                    </td>
                                    <td align="center">
                                        <label className="text-warning">---</label>
                                    </td>
                                    <td align="center">
                                        <label >---</label>
                                    </td>
                                    <td align="center">
                                        <label  >---</label>
                                    </td>
                                    <td align="center">
                                        <label  >---</label>
                                    </td>
                                
                                    <td className="action-icon"> 
                                        
                                    </td>
                                </tr> */}
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
            </div >

            {/* Add BudgetLine Start Model */}
            < div >
                {/* Modal large*/}

                < div className="modal fade" id="modal-13" tabIndex={- 1
                } role="dialog" >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    Crear Nuevo Renglón Presupuestario
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
                                <form onSubmit={onSubmit} >
                                    {/* <select onChange={this.onChanceProject} name="select" className="form-control mt-3">
                                <option value="#">Seleccione Proyecto</option>
                                {
                                    this.state.projects.map(project => 
                                        <option value={project.id}>({project.code})-{project.name} </option>
                                    )
                                }
                            </select> */}
                                    <input
                                        name=""
                                        type="hidden"
                                        className="form-control mt-3"
                                        value={idProject}
                                    />
                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        <select
                                            onChange={onChanceCategory}
                                            name="select"
                                            className="form-control mt-3"
                                        >
                                            <option value="#">Seleccione Categoría</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.code}>
                                                    ({category.code})-{category.name}{" "}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        <select
                                            onChange={onChanceClasificacion}
                                            name="select"
                                            className="form-control mt-3"
                                        >
                                            <option value="#">
                                                Seleccione Clasificación de Renglón
                    </option>
                                            {clasificaciones.map((clasificacion) => (
                                                <option key={clasificacion.id} value={clasificacion.code}>
                                                    ({clasificacion.code})-{clasificacion.name}{" "}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    {/* FIn del Select de Sub-Cuentas Atlas */}
                                    {/* </div> */}

                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        <select
                                            onChange={onChanceAccount}
                                            name="select_account_money"
                                            className="form-control mt-3"
                                        >
                                            <option value="#">Seleccione Cuenta de Origen</option>
                                            {cuentas.map((cuenta) => (
                                                <option key={cuenta.id} value={cuenta.id}>
                                                    ({cuenta.coin.name}-{cuenta.name}{" "}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        <select
                                            onChange={onChanceSupplier}
                                            name="select_suppliers"
                                            className="form-control mt-3"
                                        >
                                            <option value="#">
                                                Seleccione Beneficiario/Proveedor
                    </option>
                                            {suppliers.map((supplier) => (
                                                <option key={supplier.id} value={supplier.id}>
                                                    {supplier.contact_name}{" "}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="input-group mt-3">
                                        <textarea
                                            onChange={onChanceDescription}
                                            placeholder="Breve Descripción del gasto"
                                            className="form-control"
                                            value={budgetLine.description}
                                            name="details"
                                            cols="30"
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        <input
                                            name="buddgetstart"
                                            type="number"
                                            onChange={onChanceBudget}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingrese El valor Solicitado : 0,000.00 "
                                        />
                                    </div>
                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        <input
                                            name="code"
                                            onChange={onChanceCode}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingrese Codigo de Identificación: 01-101-01 "
                                        />
                                    </div>

                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        <input
                                            onChange={onChangeStartDate}
                                            className="form-control mt-3"
                                            type="date"
                                            placeholder="Fecha de Inicio"
                                        />
                                        <label htmlFor="">Fecha de Inicio</label>
                                    </div>
                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        <input
                                            onChange={onChangeEndDate}
                                            class="form-control mt-3"
                                            type="date"
                                            placeholder="Fecha de Final"
                                        />
                                        <label htmlFor="">Fecha de Finalización</label>
                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            id="cerrar"
                                            type="button"
                                            className="btn btn-default waves-effect "
                                            data-dismiss="modal"
                                        >
                                            Cerrar
                    </button>
                                        <button
                                            type="button"
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
            </div >

            {/* Add BudgetLine Ends Model*/}

            {/* Page body end */}
        </div >
    )

}
export default TableCost

