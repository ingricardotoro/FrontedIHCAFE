import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useHistory } from 'react-router-dom'

import RowCardsProjects from "./RowCardsProjects";
import ModalVerFilesAtlas from "./ModalVerFilesAtlas";
import jwt_decode from 'jwt-decode'

function TableCostAtlas(props) {

    const { idProject, budget_id } = props

    const [budgetLinesAtlas, setBudgetLinesAtlas] = useState([])
    const [budgetLinesCat, setBudgetLinesCat] = useState([])
    const [projects, setProjects] = useState([])
    const [categories, setCategories] = useState([])
    const [clasificaciones, setClasificaciones] = useState([])
    const [cuentas, setCuentas] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [archivo, setaArchivo] = useState([])
    const [accounts, setAccounts] = useState([])

    const [accounts_atlas, setAccounts_atlas] = useState([])
    const [account_atlas, setAccount_atlas] = useState('')

    const [resultado_atlas, setResultado_atlas] = useState([])
    const [products_atlas, setProducts_atlas] = useState([])
    const [product_atlas, setProduct_atlas] = useState('')

    const [activities_atlas, setActivities_atlas] = useState([])
    const [activity_atlas, setActivity_atlas] = useState('')

    const [sub_accounts_atlas, setSub_accounts_atlas] = useState([])
    const [sub_account_atlas, setSub_account_atlas] = useState('')

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
    const [details, setDetails] = useState("")
    const [aprobar, setAprobar] = useState(1)
    const [valor, setValor] = useState(-1)
    const [comentario, setComentario] = useState("")
    const [nombre_archivo, setNombre_archivo] = useState("")
    const [fase_archivo, setFase_archivo] = useState("")
    const [project_id, setProject_id] = useState("")
    const [account_id, setAccount_id] = useState("")
    const [category_id, setCategory_id] = useState("")
    const [code, setCode] = useState("")
    const [result_atlas, setResult_atlas] = useState('')
    const [resultados_atlas, setResultados_atlas] = useState([])
    const [variable, setVariable] = useState(0)
    const [bdg_start_project, setBdg_start_project] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const [rol, setRol] = useState(0)

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
        budgeactual: 0.0,
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

        const token = localStorage.usertoken
        const decode = jwt_decode(token)
        setRol(decode.tipo_user_id)

        const res = await axios.post(
            "http://167.99.15.83:4000/api/budgetlines/atlas/project/" + idProject
        );
        setBudgetLinesAtlas(res.data.budgetLines_atlas);

        const res3 = await axios.get("http://167.99.15.83:4000/api/projects/");
        setProjects(res3.data.projects);

        //obtenemos el budgetstart de este proyecto
        const res_pro = await axios.get(
            "http://167.99.15.83:4000/api/projects/" + idProject
        );
        setBdg_start_project(res_pro.data.data.budgetstart);

        const res4 = await axios.get(
            "http://167.99.15.83:4000/api/categories/categories_parents/"
        );
        setCategories(res4.data.categories);

        const res6 = await axios.get("http://167.99.15.83:4000/api/accounts/");
        setAccounts(res6.data.cuentas);

        const res_atlas = await axios.get(
            "http://167.99.15.83:4000/api/atlas/resultados"
        );
        setResultados_atlas(res_atlas.data.atlas_resultados);

        const res_account_atlas = await axios.get(
            "http://167.99.15.83:4000/api/atlas/accounts"
        );
        setAccounts_atlas(res_account_atlas.data.atlas_accounts);

        const res_suppliers = await axios.get(
            "http://167.99.15.83:4000/api/suppliers/"
        );
        setSuppliers(res_suppliers.data.suppliers);

        setProject_id(idProject);
    }

    const onChanceCategory = async (e) => {
        setCategory_id(e.target.value);
        const res5 = await axios.get(
            "http://167.99.15.83:4000/api/categories/categories_childs/" +
            e.target.value
        );
        setClasificaciones(res5.data.clasificaciones);
    };

    const calculo = () => {
        //setVariblesToZero();

        // para realizar el calculo de la suma de presupuestos
        setTotal_inicial(0.0)
        setTotal_ejecutado(0.0)
        setTotal_disponible(0.0)
        setTotal_solicitado(0.0)
        let sumaTotoalSolicitado = 0.0
        let sumaTotoalEjecutado = 0.0
        let totoalDisponible = 0.0

        budgetLinesAtlas.map((bl) => {

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

    /**********************LLENADO PARA EL SAVE********* */
    //onChanceProject = (e) => {setState({project_id: e.target.value})}
    /* INICIAL onChanceClasificacion = async (e) => {
          setState({code: e.target.value});
          const res7 = await axios.get('http://167.99.15.83:4000/api/categories/child/'+e.target.value);
          setState({name:res7.data.child.name});
      } */

    const onChangeStartDate = (e) => {
        // setState({ startdate: e.target.value });
        setBudgetLine({
            ...budgetLine,
            startdate: e.target.value,
        })
    };
    const onChangeEndDate = (e) => {
        //setState({ enddate: e.target.value });
        setBudgetLine({
            ...budgetLine,
            enddate: e.target.value,
        })
    };

    const onChanceBudgetStart = (e) => {
        setBudgetLine({
            ...budgetLine,
            budgetstart: e.target.value,
            //balance: e.target.value,
        })
    };

    const onChanceBudgeUpdate = (e) => {
        setBudgetLine({
            ...budgetLine,
            budgeupdate: e.target.value,
        })
    };

    const onChanceBudgetActual = (e) => {
        setBudgetLine({
            ...budgetLine,
            budgeactual: e.target.value,
        })
    };

    const onChancebuddgetFinal = (e) => {
        setBudgetLine({
            ...budgetLine,
            budgetfinal: e.target.value,
        })
    };

    const onChanceBalance = (e) => {
        setBudgetLine({
            ...budgetLine,
            balance: e.target.value,
        })
    };

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
    /**********************fINAL DEL LLENADO PARA EL SAVE********* */

    /* ININIAL  onChanceCategory = async (e) => {
          setState({category_id: e.target.value });
          const res5 = await axios.get('http://167.99.15.83:4000/api/categories/categories_childs/'+e.target.value);
          setState({clasificaciones:res5.data.clasificaciones});
      } */

    const onChanceResultAtlas = async (e) => {
        //setState({ result_atlas: e.target.value });
        setResult_atlas(e.target.value)
        const res_prod_atlas = await axios.get(
            "http://167.99.15.83:4000/api/atlas/productos/" + e.target.value
        );
        //setState({ products_atlas: res_prod_atlas.data.productos_atlas });
        setProducts_atlas(res_prod_atlas.data.productos_atlas)
    };

    const onChanceProductAtlas = async (e) => {
        //setState({ product_atlas: e.target.value });
        setProduct_atlas(e.target.value);
        const res_activity_atlas = await axios.get(
            "http://167.99.15.83:4000/api/atlas/productos/" + e.target.value
        );
        //setState({activities_atlas: res_activity_atlas.data.productos_atlas,});
        setActivities_atlas(res_activity_atlas.data.productos_atlas);
    };

    const onChanceActivityAtlas = async (e) => {
        setActivity_atlas(e.target.value);
    };


    const onChanceAccountAtlas = async (e) => {
        //setState({ account_atlas: e.target.value });
        setAccount_atlas(e.target.value);
        const res_sub_atlas = await axios.get(
            "http://167.99.15.83:4000/api/atlas/sub_accounts/" + e.target.value
        );
        setSub_accounts_atlas(res_sub_atlas.data.sub_accounts);
    };

    const onChanceSubAccountAtlas = async (e) => {
        setSub_account_atlas(e.target.value);
    };

    const onChanceSupplier = async (e) => {
        setSupplier(e.target.value);
    };

    const onChanceDetails = async (e) => {
        setDetails(e.target.value);
    };

    const onChanceAccount = async (e) => {
        setAccount_id(e.target.value);
    };

    const onChanceCode = async (e) => {
        setCode(e.target.value);
    };

    /*const onChanceCode = (e) => {
       setBudgetLine({
           ...budgetLine,
           code: e.target.value,
       })
   }*/

    const formatMoney = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "HNL",
        });
        //return number;
    }

    const onClickAprobar = async (id, maximo) => {

        if (budgetLine.balance <= maximo) {
            // si es aprobado un valor igual o menor
            //console.log("http://167.99.15.83:4000/api/budgetlines/aprobar/" +
            //  id + "/" + aprobar + "/" + valor + "/" + comentario)
            let res = await axios.post(
                "http://167.99.15.83:4000/api/budgetlines/aprobar_atlas/" +
                id + "/" + aprobar + "/" + valor + "/" + comentario
            )

            //console.log("APROBANDO" + JSON.stringify(res))
            window.location.replace('/project/' + idProject);

            //history.push('/project/' + idProject)
            //setState({ redirect: true })
            //window.location.replace('/project/' + props.idProject);
            //window.location.replace('');

        } else {
            alert("Valor No Valido");
        }

        /************ */

        /* if (valor === -1) {
            valor = maximo;
        }

        if (valor <= maximo) {
            // si es aprobado un valor igual o menor

            await axios.post(
                "http://167.99.15.83:4000/api/budgetlines/aprobar_atlas/" +
                id +
                "/" +
                aprobar +
                "/" +
                valor +
                "/" +
                comentario
            );
            window.location.replace('');
            //window.location.href = "http://sipa.ihcafe.hn/project/" + props.idProject;
        } else {
            alert("Valor No Valido");
        } */
    };

    const onClickArchivo = async (e) => {
        setaArchivo(e.target.value);
    };
    const onClickNombreArchivo = async (e) => {
        setNombre_archivo(e.target.value);
    };
    const onClickFaseArchivo = async (e) => {
        setFase_archivo(e.target.value);
    };
    const onClickSubirArchivo = async (id) => {
        //await axios.post('http://167.99.15.83:4000/api/files/'+id,{
        await axios.post("http://167.99.15.83:4000/api/files/" + id, {
            nombre_archivo: nombre_archivo,
            fase_archivo: fase_archivo,
            file: archivo,
        });
    };

    //codigo para crear un nuevo renglon presupuestario
    const onSubmit = async (e) => {
        e.preventDefault();

        let data = {
            code_resultado: result_atlas,
            code_producto: product_atlas,
            code_activity: activity_atlas,
            code_atlas: account_atlas,
            code_sub_atlas: sub_account_atlas,

            code: code,
            details: details,
            // name:name,
            status: budgetLine.status,
            //project_id:project_id,
            project_id: idProject,
            user_id: budgetLine.user_id,
            supplier_id: supplier,
            date_start: budgetLine.startdate,
            date_end: budgetLine.startdate,
            account_id: account_id,
            budgetstart: budgetLine.budgetstart,
            budgeupdate: budgetLine.budgeupdate,
            budgetfinal: budgetLine.budgetfinal,
            budgetactual: budgetLine.budgetactual,
            balance: budgetLine.balance,
            //category_id: category_id,

        }

        console.log("DATA=" + JSON.stringify(data))

        const res = await axios.post(
            "http://167.99.15.83:4000/api/budgetlines/budgetlineatlas", data
            //"localhost:4000/api/budgetlines/budgetlineatlas", data

        );
        //window.location.replace('');
        window.location.replace('/project/' + idProject);

        //window.location.href = "http://sipa.ihcafe.hn/project/" + props.idProject;
        //window.location.reload(true);
        if (res) {
        }
    };

    //funcion para elimiar un renglon presupuestario
    const onSubmitDelete = async (id) => {
        const res_p = await axios.post(
            "http://167.99.15.83:4000/api/budgetlines/budgetlineatlas/delete/" + id
        );
        window.location.replace('/project/' + idProject);

        //window.location.replace('');
        //window.location.href = "http://sipa.ihcafe.hn/project/" + props.idProject;
        //return <Redirect to={"/project/"+props.idProject}  />
        //return res_p ==1 ?  <Redirect push to="/budgets" />:  <Redirect push to="/budgets" />
        if (res_p) {
        }
    };


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
            //porcentaje_rembolsos={porcentaje_rembolsos}
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
                                                        <th>Cuenta Atlas</th>
                                                        <th>Valor Inicial</th>
                                                        <th>Modificado</th>
                                                        <th>Actual</th>
                                                        <th>Ejecutado</th>
                                                        <th>Disponible</th>
                                                        <th>Fecha</th>
                                                        {/* <th>Disponible</th> */}
                                                        <th>Estado</th>
                                                        <th>Rembolsar</th>
                                                        <th>Archivos</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {budgetLinesAtlas.map(
                                                        (budgetLinesAtlas) => (
                                                            <tr key={budgetLinesAtlas.id}>
                                                                {/* {suma(budgetLinesAtlas.buddgetstart, budgetLinesAtlas.buddgetfinal,budgetLinesAtlas.balance)}  */}

                                                                <td className="pro-name">
                                                                    <label className="text-danger">
                                                                        {budgetLinesAtlas.code}
                                                                    </label>
                                                                </td>
                                                                <td className="pro-name">
                                                                    <h6>
                                                                        {budgetLinesAtlas.atlas_account.name}
                                                                    </h6>
                                                                </td>
                                                                {budgetLinesAtlas.statu === "Aprobado" ? (
                                                                    <><td>
                                                                        <label className="text-info">
                                                                            {" "}
                                                                            {formatMoney(
                                                                                budgetLinesAtlas.budgetstart
                                                                            )}
                                                                        </label>
                                                                    </td>
                                                                        <td>
                                                                            <label className="text-info">
                                                                                {" "}
                                                                                {formatMoney(
                                                                                    budgetLinesAtlas.budgeupdate
                                                                                )}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <label className="text-info">
                                                                                {" "}
                                                                                {formatMoney(
                                                                                    budgetLinesAtlas.budgetactual
                                                                                )}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <label className="text-info">
                                                                                {" "}
                                                                                {formatMoney(
                                                                                    budgetLinesAtlas.budgetfinal
                                                                                )}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <label className="text-info">
                                                                                {" "}
                                                                                {formatMoney(
                                                                                    budgetLinesAtlas.balance
                                                                                )}
                                                                            </label>
                                                                        </td>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <td>
                                                                            <label className="text-info">
                                                                                {" "}
                                                                                {formatMoney(
                                                                                    budgetLinesAtlas.budgetstart
                                                                                )}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <label className="text-info">
                                                                                {" "}
                                                                                {formatMoney(
                                                                                    budgetLinesAtlas.budgeupdate
                                                                                )}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <label className="text-info">
                                                                                {" "}
                                                                                {formatMoney(
                                                                                    budgetLinesAtlas.balance
                                                                                )}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <label className="text-info">
                                                                                {" "}
                                                                                {formatMoney(
                                                                                    budgetLinesAtlas.budgetfinal
                                                                                )}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <label className="text-info">
                                                                                {" "}
                                                                                {formatMoney(
                                                                                    budgetLinesAtlas.balance
                                                                                )}
                                                                            </label>
                                                                        </td>
                                                                    </>
                                                                )}

                                                                <td>
                                                                    <label className="text-danger">
                                                                        {" "}
                                                                        {formatMoney(
                                                                            moment(
                                                                                budgetLinesAtlas.date_start
                                                                            ).format("DD/MM/YYYY")
                                                                        )}
                                                                    </label>
                                                                </td>
                                                                {/*<td>
                                                    <label className="text-success"> {formatMoney(budgetLinesAtlas.balance)}</label>
                                                </td> */}

                                                                {budgetLinesAtlas.status === "Solicitado" && rol === 2 ? (
                                                                    <td>
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-success waves-effect"
                                                                            data-toggle="modal"
                                                                            data-target={
                                                                                "#aprobar_" + budgetLinesAtlas.id
                                                                            }
                                                                        >
                                                                            Decidir
                                                                        </button>{" "}
                                                                    </td>
                                                                ) : (
                                                                    <td>
                                                                        <label>{budgetLinesAtlas.status}</label>
                                                                    </td>
                                                                )}

                                                                {budgetLinesAtlas.status === "Aprobado" ? (
                                                                    <td>
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-warning waves-effect"
                                                                            data-toggle="modal"
                                                                            data-target={
                                                                                "#rembolsar_" + budgetLinesAtlas.id
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
                                                                            "#ver_archivos_" + budgetLinesAtlas.id
                                                                        }
                                                                    >
                                                                        Ver
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-success waves-effect"
                                                                        data-toggle="modal"
                                                                        data-target={
                                                                            "#archivos_" + budgetLinesAtlas.id
                                                                        }
                                                                    >
                                                                        Subir
                                                                    </button>
                                                                </td>
                                                                <td align="center" className="action-icon">
                                                                    < Link
                                                                        to={"/budgetline/edit/" + props.idProject + "/" + budgetLinesAtlas.id}
                                                                        className="m-r-15 text-muted"
                                                                        data-original-title="Edit"
                                                                    >
                                                                        <i className="icofont icofont-ui-edit"
                                                                        ></i>
                                                                    </Link>

                                                                    <a
                                                                        href="#!"
                                                                        className="text-muted"
                                                                        title
                                                                        data-original-title="Eliminar"
                                                                    >
                                                                        <i
                                                                            className="icofont icofont-delete-alt"
                                                                            data-toggle="modal"
                                                                            data-target={
                                                                                "#modal_delete_" + budgetLinesAtlas.id
                                                                            }
                                                                        ></i>
                                                                    </a>
                                                                </td>

                                                                {/* INICIL Modal DELETE*/}

                                                                <div
                                                                    className="modal fade"
                                                                    id={"modal_delete_" + budgetLinesAtlas.id}
                                                                    tabIndex={-1}
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
                                                                                    {
                                                                                        budgetLinesAtlas.atlas_account
                                                                                            .name
                                                                                    }{" "}
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
                                                                                            budgetLinesAtlas.id
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
                                                                                            Eliminar Este Renglon
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
                                                                    id={"aprobar_" + budgetLinesAtlas.id}
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
                                                                                    Monto:{" "}
                                                                                    {formatMoney(
                                                                                        budgetLinesAtlas.budgetstart
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
                                                                                        {budgetLinesAtlas.details}
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
                                                                                        Value={
                                                                                            budgetLinesAtlas.budgetstart
                                                                                        }
                                                                                    />

                                                                                    <label>Comentarios</label>
                                                                                    <textarea
                                                                                        onChange={onchangeComentario}
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
                                                                                        type="button"
                                                                                        onClick={() =>
                                                                                            onClickAprobar(
                                                                                                budgetLinesAtlas.id,
                                                                                                budgetLinesAtlas.budgetstart
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

                                                                <ModalVerFilesAtlas
                                                                    budget_id={props.budget_id}
                                                                    idProject={props.idProject}
                                                                    budgetlineatlas={budgetLinesAtlas.id}
                                                                    budgetlineatlasName={
                                                                        budgetLinesAtlas.atlas_account.name
                                                                    }
                                                                    budgetlineatlasDetails={
                                                                        budgetLinesAtlas.details
                                                                    }
                                                                />

                                                                {/* SUBIR Archivos */}
                                                                <div
                                                                    class="modal fade"
                                                                    id={"archivos_" + budgetLinesAtlas.id}
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
                                                                                    {
                                                                                        budgetLinesAtlas.atlas_account
                                                                                            .name
                                                                                    }
                                                                                    -
                                                                                    {formatMoney(
                                                                                        budgetLinesAtlas.budgetstart
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
                                                                                    "http://167.99.15.83:4000/api/files/atlas"
                                                                                }
                                                                                method="post"
                                                                                enctype="multipart/form-data"
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
                                                                                        value={budgetLinesAtlas.id}
                                                                                        name="budgetlineatlas_id"
                                                                                        type="hidden"
                                                                                        className="form-control"
                                                                                    />
                                                                                    <input
                                                                                        value={props.budget_id}
                                                                                        name="budget_id"
                                                                                        type="hidden"
                                                                                        className="form-control"
                                                                                    />
                                                                                    <input
                                                                                        value={props.idProject}
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
                                                                                    {/* <button type="button" onClick={ () =>onClickSubirArchivo(budgetLinesAtlas.id )} class="btn btn-primary waves-effect waves-light ">Guardar</button> */}
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
                                                                    id={"rembolsar_" + budgetLinesAtlas.id}
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
                                                                                    Rembolsar {budgetLinesAtlas.name}-
                                                                                    {formatMoney(
                                                                                        budgetLinesAtlas.budgetstart
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
                                                                            <div class="modal-body" align="center">
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
                                                                                        budgetLinesAtlas.id
                                                                                    }
                                                                                    value={budgetLinesAtlas.id}
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
                                                        )
                                                    )}

                                                    {/*  <tr>
                                        <td align="center" className="pro-name">
                                            <label className="text-danger">---</label>
                                        </td>
                                        <td className="pro-name">
                                            <h6>Total de Prespuesto APROBADO</h6>
                                            <span>Suma de los Totales</span>
                                        </td>
                                        
                                        <td>
                                            <label className="text-info">{formatMoney(total_inicial)}</label>
                                        </td>
                                        <td>
                                            <label className="text-danger">{formatMoney(total_ejecutado)}</label>
                                        </td>
                                        <td>
                                            <label className="text-success">{formatMoney(total_disponible)}</label>
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
                                             <label>{formatMoney(total_solicitado)}</label> 
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
            </div>

            {/* Add Contact Start Model */}
            <div>
                {/* Modal large*/}

                <div className="modal fade" id="modal-13" tabIndex={-1} role="dialog">
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
                                <form onSubmit={onSubmit}>
                                    {/* <select onChange={onChanceProject} name="select" className="form-control mt-3">
                                    <option value="#">Seleccione Proyecto</option>
                                    {
                                        projects.map(project => 
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
                                    {/* <div style={{ width: "50%", display: "inline-block" }}>
                      <select
                        onChange={onChanceCategory}
                        name="select"
                        className="form-control mt-3"
                      >
                        <option value="#">Seleccione Categoría</option>
                        {categories.map((category) => (
                          <option value={category.code}>
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
                          <option value={clasificacion.code}>
                            ({clasificacion.code})-{clasificacion.name}{" "}
                          </option>
                        ))}
                      </select>
                    </div> */}
                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        {/* Select de Resultados Atlas */}
                                        <select
                                            onChange={onChanceResultAtlas}
                                            name="select_result_atlas"
                                            className="form-control mt-3"
                                        >
                                            <option value="#">Seleccione Resultado Atlas</option>
                                            {resultados_atlas.map((resultado_atlas) => (
                                                <option value={resultado_atlas.code}>
                                                    ({resultado_atlas.code})-{resultado_atlas.name}{" "}
                                                </option>
                                            ))}
                                        </select>
                                        {/* FIn del Select de Resultados Atlas */}
                                    </div>

                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        {/* Select de Productos Atlas */}
                                        <select
                                            onChange={onChanceProductAtlas}
                                            name="select_product_atlas"
                                            className="form-control mt-3"
                                        >
                                            <option value="#">Seleccione Producto Atlas</option>
                                            {products_atlas.map((product_atlas) => (
                                                <option value={product_atlas.code}>
                                                    ({product_atlas.code})-{product_atlas.name}{" "}
                                                </option>
                                            ))}
                                        </select>
                                        {/* FIn del Select de Productos Atlas */}
                                    </div>

                                    <div>
                                        {/* Select de Productos Atlas */}
                                        <select
                                            onChange={onChanceActivityAtlas}
                                            name="select_activity_atlas"
                                            className="form-control mt-3"
                                        >
                                            <option value="#">Seleccione Actividad Atlas</option>
                                            {activities_atlas.map((activity_atlas) => (
                                                <option value={activity_atlas.code}>
                                                    ({activity_atlas.code})-{activity_atlas.name}{" "}
                                                </option>
                                            ))}
                                        </select>
                                        {/* FIn del Select de Productos Atlas */}
                                    </div>

                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        {/* Select de Cuentas Atlas */}
                                        <select
                                            onChange={onChanceAccountAtlas}
                                            name="select_account_atlas"
                                            className="form-control mt-3"
                                        >
                                            <option value="#">Seleccione Cuenta Atlas</option>
                                            {accounts_atlas.map((account_atlas) => (
                                                <option value={account_atlas.id}>
                                                    {account_atlas.name}{" "}
                                                </option>
                                            ))}
                                        </select>
                                        {/* FIn del Select de Cuentas Atlas */}
                                    </div>

                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        {/* Select de Sub-Cuentas Atlas */}
                                        <select
                                            onChange={onChanceSubAccountAtlas}
                                            name="select_sub_account_atlas"
                                            className="form-control mt-3"
                                        >
                                            <option value="#">Seleccione Cuenta IHCAFE</option>
                                            {sub_accounts_atlas.map(
                                                (sub_account_atlas) => (
                                                    <option value={sub_account_atlas.id}>
                                                        {sub_account_atlas.name}{" "}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        {/* FIn del Select de Sub-Cuentas Atlas */}
                                    </div>

                                    {/* <select onChange={onChanceCategory} name="select" className="form-control mt-3">
                                    <option value="#">Seleccione Categoría</option>
                                   {  
                                        categories.map(category => 
                                            <option value={category.code}>({category.code})-{category.name} </option>
                                        )
                                    } 
                                </select> */}

                                    {/* <select onChange={onChanceClasificacion} name="select" className="form-control mt-3">
                                    <option value="#">Seleccione Clasificación de Renglón</option>
                                    {  
                                         clasificaciones.map(clasificacion => 
                                            <option value={clasificacion.code}>({clasificacion.code})-{clasificacion.name} </option>
                                        )
                                    } 
                                </select> */}
                                    <div style={{ width: "50%", display: "inline-block" }}>
                                        <select
                                            onChange={onChanceAccount}
                                            name="select_account_money"
                                            className="form-control mt-3"
                                        >
                                            <option value="#">Seleccione Cuenta de Origen</option>

                                            {accounts.map((cuenta) => (
                                                <option value={cuenta.id}>
                                                    ({cuenta.coin.code})-{cuenta.name}{" "}
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
                                                <option value={supplier.id}>
                                                    {supplier.contact_name}{" "}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="input-group mt-3">
                                        <textarea
                                            onChange={onChanceDetails}
                                            placeholder="Breve Descripción para el informe ATLAS"
                                            className="form-control"
                                            name="details"
                                            cols="30"
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    <div style={{ width: "25%", display: "inline-block" }}>
                                        <label htmlFor="">Inicial</label>

                                        <input
                                            name="buddgetstart"
                                            onChange={onChanceBudgetStart}
                                            type="text"
                                            className="form-control"
                                            placeholder="valor Inicial : 0,000.00 "
                                        />
                                    </div>
                                    <div style={{ width: "25%", display: "inline-block" }}>
                                        <label htmlFor="">Modificado</label>

                                        <input
                                            name="buddgetupdate"
                                            onChange={onChanceBudgeUpdate}
                                            type="text"
                                            className="form-control"
                                            placeholder="valor Modificado : 0,000.00 "
                                        />
                                    </div>
                                    <div style={{ width: "25%", display: "inline-block" }}>
                                        <label htmlFor="">Actual</label>

                                        <input
                                            name="buddgetactual"
                                            onChange={onChanceBudgetActual}
                                            type="text"
                                            className="form-control"
                                            placeholder="valor Actual : 0,000.00 "
                                        />
                                    </div>
                                    <div style={{ width: "25%", display: "inline-block" }}>
                                        <label htmlFor="">En Ejecucion</label>

                                        <input
                                            name="buddgetfinal"
                                            onChange={onChancebuddgetFinal}
                                            type="text"
                                            className="form-control"
                                            placeholder="valor Ejecucion : 0,000.00 "
                                        />
                                    </div>

                                    <div style={{ width: "33%", display: "inline-block", marginTop: '15px' }}>
                                        <label htmlFor="">Disponible</label>

                                        <input
                                            name="balance"
                                            onChange={onChanceBalance}
                                            type="text"
                                            className="form-control"
                                            placeholder="Valor Disponible"
                                        />
                                    </div>

                                    <div style={{ width: "33%", display: "inline-block", marginTop: '15px' }}>
                                        <label htmlFor="">Codigo de Identificación</label>

                                        <input
                                            name="code"
                                            onChange={onChanceCode}
                                            type="text"
                                            className="form-control"
                                            placeholder="Codigo de Identificación: 01-101-01 "
                                        />
                                    </div>

                                    <div style={{ width: "33%", display: "inline-block", marginTop: '15px' }}>
                                        <label htmlFor="">Fecha</label>
                                        <input
                                            onChange={onChangeStartDate}
                                            class="form-control "
                                            type="date"
                                            placeholder="Fecha"
                                        />
                                    </div>
                                    {/* <div style={{ width: "33%", display: "inline-block", marginTop: '15px' }}>
                                        <label htmlFor="">Fecha de Finalización</label>
                                        <input
                                            onChange={onChangeEndDate}
                                            class="form-control "
                                            type="date"
                                            placeholder="Fecha de Final"
                                        />
                                    </div> */}

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
            </div>

            {/* Add Contact Ends Model*/}

            {/* Page body end */}
        </div>
    );
}


export default TableCostAtlas

