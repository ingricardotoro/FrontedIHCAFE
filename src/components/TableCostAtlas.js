import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//import 'react-toastify/scss/main.scss'

import RowCardsProjects from './RowCardsProjects';
import ModalVerFilesAtlas from './ModalVerFilesAtlas';
import jwt_decode from 'jwt-decode';
import { API_URL } from '../config/api';

function TableCostAtlas(props) {
  const { idProject, budget_id } = props;

  const [total_ejecutado, setTotal_ejecutado] = useState(0);
  const [total_aprobado, setTotal_aprobado] = useState(0);
  const [budgetLinesAtlas, setBudgetLinesAtlas] = useState([]);

  const [budgetLinesCat, setBudgetLinesCat] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [archivo, setaArchivo] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [accounts_atlas, setAccounts_atlas] = useState([]);
  const [account_atlas, setAccount_atlas] = useState('');
  const [products_atlas, setProducts_atlas] = useState([]);
  const [product_atlas, setProduct_atlas] = useState('');
  const [activities_atlas, setActivities_atlas] = useState([]);
  const [activity_atlas, setActivity_atlas] = useState('');
  const [sub_accounts_atlas, setSub_accounts_atlas] = useState([]);
  const [sub_account_atlas, setSub_account_atlas] = useState('');
  const [resultado_atlas, setResultado_atlas] = useState([]);

  //const [total_disponible, setTotal_disponible] = useState(0);
  //const [total_ejecutado, setTotal_ejecutado] = useState(0);
  //const [total_inicial, setTotal_inicial] = useState(0);
  //const [total_rembolsos, setTotal_rembolsos] = useState(0);
  //const [porcentaje_disponible, setPorcentaje_disponible] = useState(0);
  //const [porcentaje_ejecutado, setPorcentaje_ejecutado] = useState(0);
  //const [porcentaje_rembolsos, setPorcentaje_rembolsos] = useState(0);
  //const [porcentaje_solicitado, setPorcentaje_solicitado] = useState(0);
  //const [total_solicitado, setTotal_solicitado] = useState(0);
  const [supplier, setSupplier] = useState(0);
  const [details, setDetails] = useState('');
  const [aprobar, setAprobar] = useState(1);
  const [valor, setValor] = useState(-1);
  const [comentario, setComentario] = useState('');
  const [nombre_archivo, setNombre_archivo] = useState('');
  const [fase_archivo, setFase_archivo] = useState('');
  const [project_id, setProject_id] = useState('');
  const [account_id, setAccount_id] = useState('');
  //const [category_id, setCategory_id] = useState('');
  const [code, setCode] = useState('');
  const [result_atlas, setResult_atlas] = useState('');
  const [resultados_atlas, setResultados_atlas] = useState([]);
  //const [variable, setVariable] = useState(0);
  const [bdg_start_project, setBdg_start_project] = useState(0);
  //const [redirect, setRedirect] = useState(false);
  const [rol, setRol] = useState(0);

  const [fileData, setFileData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  let sumaTotalAprobado = 0.0;
  let sumaTotoalEjecutado = 0.0;

  const [budgetLine, setBudgetLine] = useState({
    code_resultado: 0,
    code_producto: 0,
    code_activity: 0,
    code_atlas: 0,
    code_sub_atlas: 0,

    code: 0,
    details: '',
    startdate: Date.now(),
    enddate: Date.now(),
    account_id: 0,
    project_id: 0,
    user_id: 1,
    supplier_id: 1,
    budgetstart: 0.0,
    budgeupdate: 0.0,
    budgeactual: 0.0,
    budgetfinal: 0.0,
    balance: 0.0,
    status: 'Aprobado',

    //name: '',
    //category_id: 0,
    //sub_category_code: '',
  });

  let history = useHistory();

  useEffect(() => {
    if (!localStorage.usertoken) {
      history.push('/');
      //window.location.href = "/"
    }

    getData();
    if (budgetLinesAtlas.length > 0) {
      calculo();
    }
  }, []);

  const getData = async () => {
    const token = localStorage.usertoken;
    const decode = jwt_decode(token);
    setRol(decode.tipo_user_id);

    const res = await axios.post(
      `${API_URL}/budgetlines/atlas/project/${idProject}`
    );
    const buds = res.data.budgetLines_atlas;
    buds.map((bl) => {
      sumaTotalAprobado += parseFloat(bl.buddgetstart);

      if (bl.status === 'Ejecutado') {
        sumaTotoalEjecutado += parseFloat(bl.balance);
      }
    });
    setTotal_ejecutado(sumaTotoalEjecutado);
    setTotal_aprobado(sumaTotalAprobado);
    setBudgetLinesAtlas(res.data.budgetLines_atlas);

    const res3 = await axios.get(`${API_URL}/projects/`);
    setProjects(res3.data.projects);

    //obtenemos el budgetstart de este proyecto
    const res_pro = await axios.get(`${API_URL}/projects/${idProject}`);
    setBdg_start_project(res_pro.data.data.budgetstart);

    const res4 = await axios.get(`${API_URL}/categories/categories_parents/`);
    setCategories(res4.data.categories);

    const res6 = await axios.get(`${API_URL}/accounts/`);
    setAccounts(res6.data.cuentas);

    const res_atlas = await axios.get(`${API_URL}/atlas/resultados`);
    setResultados_atlas(res_atlas.data.atlas_resultados);

    const res_account_atlas = await axios.get(`${API_URL}/atlas/accounts`);
    setAccounts_atlas(res_account_atlas.data.atlas_accounts);

    const res_suppliers = await axios.get(`${API_URL}/suppliers/`);
    setSuppliers(res_suppliers.data.suppliers);

    setProject_id(idProject);
  };

  /*const onChanceCategory = async (e) => {
    setCategory_id(e.target.value);
    const res5 = await axios.get(
      `${API_URL}/categories/categories_childs/${e.target.value}`
    );
    setClasificaciones(res5.data.clasificaciones);
  };*/

  const getAllBudgets = async () => {
    const res = await axios.post(
      `${API_URL}/budgetlines/atlas/project/${idProject}`
    );
    const buds = res.data.budgetLines_atlas;
    buds.map((bl) => {
      sumaTotalAprobado += parseFloat(bl.buddgetstart);

      if (bl.status === 'Ejecutado') {
        sumaTotoalEjecutado += parseFloat(bl.balance);
      }
    });
    setTotal_ejecutado(sumaTotoalEjecutado);
    setTotal_aprobado(sumaTotalAprobado);
    setBudgetLinesAtlas(res.data.budgetLines_atlas);
  };

  const calculo = () => {
    //setVariblesToZero();
    // para realizar el calculo de la suma de presupuestos
    /*  setTotal_inicial(0.0);
    setTotal_ejecutado(0.0);
    setTotal_disponible(0.0);
    setTotal_solicitado(0.0);
    let sumaTotoalSolicitado = 0.0;
    let sumaTotoalEjecutado = 0.0;
    let totoalDisponible = 0.0;

    budgetLinesAtlas.map((bl) => {
      if (bl.status === 'Solicitado') {
        sumaTotoalSolicitado += parseFloat(bl.balance);
      }
      if (bl.status === 'Aprobado') {
        sumaTotoalEjecutado += parseFloat(bl.balance);
      }
    });

    totoalDisponible =
      parseFloat(bdg_start_project) - parseFloat(sumaTotoalEjecutado);

    setTotal_solicitado(sumaTotoalSolicitado);
    setTotal_ejecutado(sumaTotoalEjecutado);
    setTotal_disponible(
      parseFloat(bdg_start_project) - parseFloat(sumaTotoalEjecutado)
    );

    setPorcentaje_ejecutado(
      (sumaTotoalEjecutado * 100) / parseFloat(bdg_start_project)
    );
    setPorcentaje_disponible(
      (totoalDisponible * 100) / parseFloat(bdg_start_project)
    );
    setPorcentaje_solicitado(
      (sumaTotoalSolicitado * 100) / parseFloat(bdg_start_project)
    ); */
  };

  const cleanFormAprobar = () => {
    setBudgetLine({
      code_resultado: 0,
      code_producto: 0,
      code_activity: 0,
      code_atlas: 0,
      code_sub_atlas: 0,

      code: 0,
      details: '',
      startdate: Date.now(),
      enddate: Date.now(),
      account_id: 0,
      project_id: idProject,
      user_id: 1,
      supplier_id: 1,
      budgetstart: 0.0,
      budgeupdate: 0.0,
      budgeactual: 0.0,
      budgetfinal: 0.0,
      balance: 0.0,
      status: 'Aprobado',
    });
  };

  /**********************LLENADO PARA EL SAVE********* */
  //onChanceProject = (e) => {setState({project_id: e.target.value})}
  /* INICIAL onChanceClasificacion = async (e) => {
          setState({code: e.target.value});
          const res7 = await axios.get('https://api.ihcafe.hn/api/categories/child/'+e.target.value);
          setState({name:res7.data.child.name});
      } */

  const onChangeStartDate = (e) => {
    // setState({ startdate: e.target.value });
    setBudgetLine({
      ...budgetLine,
      startdate: e.target.value,
    });
  };
  const onChangeEndDate = (e) => {
    //setState({ enddate: e.target.value });
    setBudgetLine({
      ...budgetLine,
      enddate: e.target.value,
    });
  };

  const onChanceBudgetStart = (e) => {
    setBudgetLine({
      ...budgetLine,
      budgetstart: e.target.value,
      //balance: e.target.value,
    });
  };

  const onChanceBudgeUpdate = (e) => {
    setBudgetLine({
      ...budgetLine,
      budgeupdate: e.target.value,
    });
  };

  const onChanceBudgetActual = (e) => {
    setBudgetLine({
      ...budgetLine,
      budgeactual: e.target.value,
    });
  };

  const onChancebuddgetFinal = (e) => {
    setBudgetLine({
      ...budgetLine,
      budgetfinal: e.target.value,
    });
  };

  const onChanceBalance = (e) => {
    setBudgetLine({
      ...budgetLine,
      balance: e.target.value,
    });
  };

  const onchangeComentario = (e) => {
    setComentario(e.target.value);
  };

  const onchangeMonto = (e) => {
    setValor(e.target.value);
  };

  const onchangeSelectAprobar = (e) => {
    setBudgetLine({
      ...budgetLine,
      aprobar: e.target.value,
    });
  };
  /**********************fINAL DEL LLENADO PARA EL SAVE********* */

  /* ININIAL  onChanceCategory = async (e) => {
          setState({category_id: e.target.value });
          const res5 = await axios.get('https://api.ihcafe.hn/api/categories/categories_childs/'+e.target.value);
          setState({clasificaciones:res5.data.clasificaciones});
      } */

  const onChanceResultAtlas = async (e) => {
    //setState({ result_atlas: e.target.value });
    setResult_atlas(e.target.value);
    const res_prod_atlas = await axios.get(
      `${API_URL}/atlas/productos/${e.target.value}`
    );
    //setState({ products_atlas: res_prod_atlas.data.productos_atlas });
    setProducts_atlas(res_prod_atlas.data.productos_atlas);
  };

  const onChanceProductAtlas = async (e) => {
    //setState({ product_atlas: e.target.value });
    setProduct_atlas(e.target.value);
    const res_activity_atlas = await axios.get(
      `${API_URL}/atlas/productos/${e.target.value}`
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
      `${API_URL}/atlas/sub_accounts/${e.target.value}`
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
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'HNL',
    });
    //return number;
  };

  const onClickAprobar = async (id, maximo) => {
    if (budgetLine.budgetstart <= maximo) {
      // si es aprobado un valor igual o menor

      let value = 0;
      let valueComent = '';

      if (valor === -1) {
        //en caso de ser el mismo valor y no se halla cambiado
        value = maximo;
      } else {
        value = valor;
      }

      if (comentario === '') {
        //en caso de ser el mismo valor y no se halla cambiado
        //console.log("SIIII")
        valueComent = 'sin comentarios';
      } else {
        //console.log("NOOOO")
        valueComent = comentario;
      }

      await axios
        .post(
          `${API_URL}/budgetlines/aprobar_atlas/${id}/${aprobar}/${value}/${valueComent}`
        )
        .then((dataResult) => {
          //console.log("RESULT=" + JSON.stringify(dataResult))
          //volvemos a traer los budgetsLines
          getData();
          //cerramos el modald de create New
          document.getElementById('btnCerrarAprobar_' + id).click();
        })
        .catch((err) => {
          alert(err);
        });

      //console.log("APROBANDO" + JSON.stringify(res))
      //window.location.replace('/project/' + idProject);

      //history.push('/project/' + idProject)
      //setState({ redirect: true })
      //window.location.replace('/project/' + props.idProject);
      //window.location.replace('');
    } else {
      alert('Valor No Valido');
    }

    /************ */
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

  const handleFileChange = (e) => {
    const [file] = e.target.files; //destructuracion
    const isValidSize = file.size < 10 * 1024 * 1024; //tamaño maximo de 10 megas
    const isNameOfOneImageRegEx = /.(jpe?g|gif|png|svg|pdf)$/i; //para validar el tipo de archivo , solo imagenes o PDF
    const isValidType = isNameOfOneImageRegEx.test(file.name);

    if (!isValidSize)
      return toast.error('Archivo supera el peso permitido (10 Mg)');
    if (!isValidType) return toast.error('Solo se permiten imágenes o PDF');

    setFileData(file);

    const reader = new FileReader();

    //le pasamos el file
    reader.readAsDataURL(file);

    //la siguietne funcion que se ejecuta al terminar de cargar el archivo
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };

  const onClickSubirArchivo = async (id) => {
    //e.preventDefault();

    if (fileData !== null && nombre_archivo !== '') {
      let formDataFile = new FormData();
      formDataFile.append('archivo', fileData);
      formDataFile.append('file_name', nombre_archivo);
      formDataFile.append('fase', fase_archivo);
      formDataFile.append('budget_id', budget_id);
      formDataFile.append('budgetlineatlas_id', id);

      //console.log(formDataFile)

      //await axios.post('https://api.ihcafe.hn/api/files/'+id,{
      await axios
        .post(API_URL + '/files/atlas/', formDataFile)
        .then((dataResult) => {
          //volvemos a traer los budgtines
          toast.success('Archivo Subido Exitosamente', {
            position: toast.POSITION.TOP_RIGHT,
          });
          document.getElementById('btnCerrarSF_' + id).click();
          getData();

          //cerramos el modald de create New
          //document.getElementById('archivos_' + id).click()
        })
        .catch((err) => {
          toast.error('Error:' + err, { position: toast.POSITION.TOP_RIGHT });

          //alert(err)
        });
    } else {
      toast.error('Faltan Datos', { position: toast.POSITION.TOP_RIGHT });
    }

    /*await axios.post("https://api.ihcafe.hn/api/files/" + id, {
            nombre_archivo: nombre_archivo,
            fase_archivo: fase_archivo,
            file: fileData,
        });*/
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
      date_start: budgetLine.startdate,
      date_end: budgetLine.startdate,
      account_id: account_id,
      project_id: idProject,
      user_id: budgetLine.user_id,
      supplier_id: supplier,
      budgetstart: budgetLine.budgetstart,
      budgeupdate: budgetLine.budgeupdate,
      budgetfinal: budgetLine.budgetfinal,
      budgetactual: budgetLine.budgetactual,
      balance: budgetLine.balance,
      status: budgetLine.status,

      // name:name,
      //project_id:project_id,
      //category_id: category_id,
    };

    //console.log("DATA=" + JSON.stringify(data))

    /*const res = await axios.post(
            "https://api.ihcafe.hn/api/budgetlines/budgetlineatlas", data
            //"localhost:4000/api/budgetlines/budgetlineatlas", data

        );*/

    await axios
      .post(API_URL + '/budgetlines/budgetlineatlas', data)
      //.post('localhost:4000/budgetlines/budgetlineatlas', data)
      .then((dataResult) => {
        //volvemos a traer los budgtines
        getData();
        //cerramos el modald de create New
        document.getElementById('btnCloseNew').click();
      })
      .catch((err) => {
        alert(err);
      });

    //window.location.replace('');
    //window.location.replace('/project/' + idProject);
    //history.replace('/project/' + idProject)

    //window.location.href = "http://sipa.ihcafe.hn/project/" + props.idProject;
    //window.location.reload(true);
    /*if (res) {
        }*/
  };

  const handleDelete = async (id) => {
    const res_p = await axios.post(
      `${API_URL}/budgetlines/budgetlineatlas/delete/${id}`
    );

    //window.location.replace('');
    //window.location.replace('/project/' + idProject);
    //console.log(res_p.data);
    //history.push('/project/' + idProject);
    if (res_p.data.ok === true) {
      document.getElementById(`btn_del_cerrar_${id}`).click();
      getAllBudgets();
    } else {
      alert('DATA OK = FALSE');
    }
  };

  const handleClickEdit = (budgetLine) => {
    setBudgetLine(budgetLine);
    document.getElementById('btn_modal_edit').click();
    //document.getElementById('#modal_edit').modal('show');
  };

  const handleEdit = async (id) => {
    const res_p = await axios.put(
      API_URL + '/budgetlines/budgetlineatlas/update/' + idProject + '/' + id,
      {
        code: budgetLinesAtlas.code,
        description: budgetLinesAtlas.details,
        supplier_id: budgetLinesAtlas.supplier,
        date_start: budgetLinesAtlas.date_start,
        buddgetstart: budgetLinesAtlas.budgetstart,
        balance: budgetLinesAtlas.balance,
      }
    );

    //window.location.replace('');
    //window.location.replace('/project/' + idProject);

    //history.push('/project/' + idProject);
    if (res_p.data.ok === true) {
      document.getElementById('btn_cerrar_edit').click();
      getAllBudgets();
    }
  };

  //funcion para elimiar un renglon presupuestario
  /* const onSubmitDelete = async (id) => {
    await axios
      .post(`${API_URL}/budgetlines/budgetlineatlas/delete/${id}`)
      .then((dataResult) => {
        //volvemos a traer los budgtines
        alert(JSON.stringify(dataResult));
        getData();
        //cerramos el modald de create New
        document.getElementById('detele_' + id).click();
      })
      .catch((err) => {
        alert(err);
      });
  }; */

  return (
    <div>
      <RowCardsProjects aprobado={total_aprobado} ejecutado={total_ejecutado} />

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
                            <th>Aprobado</th>
                            <th>Ejecutado</th>
                            <th>Disponible</th>
                            <th>Fecha</th>
                            <th>Ejecutar</th>
                            <th>Archivos</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {budgetLinesAtlas !== undefined
                            ? budgetLinesAtlas.map((budgetLinesAtlas) => (
                                <tr key={budgetLinesAtlas.id}>
                                  {/* {suma(budgetLinesAtlas.buddgetstart, budgetLinesAtlas.buddgetfinal,budgetLinesAtlas.balance)}  */}

                                  <td className="pro-name">
                                    <label className="text-danger">
                                      {budgetLinesAtlas.code
                                        ? budgetLinesAtlas.code
                                        : '---'}
                                    </label>
                                  </td>
                                  <td className="pro-name">
                                    <h6>
                                      {budgetLinesAtlas.atlas_account.name}
                                    </h6>
                                  </td>
                                  {budgetLinesAtlas.statu === 'Aprobado' ? (
                                    <>
                                      <td>
                                        <label className="text-info">
                                          {formatMoney(
                                            budgetLinesAtlas.buddgetstart
                                          )}
                                        </label>
                                      </td>
                                      <td>
                                        <label className="text-info">
                                          {'---'}
                                        </label>
                                      </td>

                                      <td>
                                        <label className="text-info">
                                          {'---'}
                                        </label>
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td>
                                        <label className="text-info">
                                          {formatMoney(
                                            budgetLinesAtlas.buddgetstart
                                          )}
                                        </label>
                                      </td>
                                      <td>
                                        <label className="text-danger">
                                          {formatMoney(
                                            budgetLinesAtlas.balance
                                          )}
                                        </label>
                                      </td>

                                      <td>
                                        <label className="text-success">
                                          {formatMoney(
                                            parseFloat(
                                              budgetLinesAtlas.buddgetstart
                                            ) -
                                              parseFloat(
                                                budgetLinesAtlas.balance
                                              )
                                          )}
                                        </label>
                                      </td>
                                    </>
                                  )}

                                  <td>
                                    {budgetLinesAtlas.status === 'Aprobado' ? (
                                      '---'
                                    ) : (
                                      <label className="text-danger">
                                        {formatMoney(
                                          moment(budgetLine.date_start).format(
                                            'DD/MM/YYYY'
                                          )
                                        )}
                                      </label>
                                    )}
                                  </td>

                                  {
                                    //budgetLine.status === "Solicitado" && rol === 2 ? (
                                    budgetLinesAtlas.status === 'Aprobado' ? (
                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-danger waves-effect"
                                          data-toggle="modal"
                                          data-target={
                                            '#aprobar_' + budgetLinesAtlas.id
                                          }
                                        >
                                          Ejecutar
                                        </button>{' '}
                                      </td>
                                    ) : (
                                      <td>
                                        <label>{'Ejecutado'}</label>
                                      </td>
                                    )
                                  }

                                  {/*budgetLinesAtlas.status === 'Aprobado' ? (
                                    <td>
                                      <button
                                        type="button"
                                        class="btn btn-warning waves-effect"
                                        data-toggle="modal"
                                        data-target={
                                          '#rembolsar_' + budgetLinesAtlas.id
                                        }
                                      >
                                        Rembolsar
                                      </button>
                                    </td>
                                  ) : (
                                    <td align="center">
                                      <label>---</label>
                                    </td>
                                  )*/}

                                  {budgetLinesAtlas.status === 'Aprobado' ? (
                                    <td></td>
                                  ) : (
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-primary waves-effect"
                                        data-toggle="modal"
                                        data-target={
                                          '#ver_archivos_' + budgetLinesAtlas.id
                                        }
                                      >
                                        Ver
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-success waves-effect"
                                        data-toggle="modal"
                                        data-target={
                                          '#archivos_' + budgetLinesAtlas.id
                                        }
                                      >
                                        Subir
                                      </button>
                                    </td>
                                  )}

                                  <td align="center" className="action-icon">
                                    {/* <Link
                                      to={
                                        '/budgetline/edit/' +
                                        idProject +
                                        '/' +
                                        budgetLinesAtlas.id
                                      }
                                      className="m-r-15 text-muted"
                                      data-original-title="Edit"
                                    >
                                      <i className="icofont icofont-ui-edit"></i>
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
                                          '#modal_delete_' + budgetLinesAtlas.id
                                        }
                                      ></i>
                                    </a> */}

                                    <button
                                      onClick={() =>
                                        handleClickEdit(budgetLinesAtlas)
                                      }
                                      className="text-muted"
                                      data-original-title="Editar"
                                    >
                                      <i className="icofont icofont-ui-edit"></i>
                                    </button>

                                    <button
                                      className="text-muted"
                                      data-original-title="Eliminar"
                                    >
                                      <i
                                        className="icofont icofont-delete-alt"
                                        data-toggle="modal"
                                        data-target={
                                          '#modal_delete_' + budgetLinesAtlas.id
                                        }
                                      ></i>
                                    </button>
                                  </td>

                                  {/* INICIO Modal DELETE*/}

                                  <div
                                    className="modal fade"
                                    id={'modal_delete_' + budgetLinesAtlas.id}
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
                                            Eliminar Presupuesto:{' '}
                                            {
                                              budgetLinesAtlas.atlas_account
                                                .name
                                            }{' '}
                                          </h4>
                                          <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            id={
                                              'btn_del_cerrar_' +
                                              budgetLinesAtlas.id
                                            }
                                          >
                                            <span aria-hidden="true">×</span>
                                          </button>
                                        </div>
                                        <div className="modal-body">
                                          <div
                                            style={{
                                              width: '100%',
                                              textAlign: 'center',
                                              display: 'inline-block',
                                            }}
                                          >
                                            <button
                                              type="button"
                                              className="btn btn-danger waves-effect "
                                              onClick={() =>
                                                handleDelete(
                                                  budgetLinesAtlas.id
                                                )
                                              }
                                            >
                                              Eliminar Este Renglón
                                              Presupuestario
                                            </button>
                                          </div>

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
                                    className="modal fade"
                                    id={'aprobar_' + budgetLinesAtlas.id}
                                    tabIndex="-1"
                                    role="dialog"
                                  >
                                    <div
                                      className="modal-dialog modal-lg"
                                      role="document"
                                    >
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h5 className="modal-title">
                                            {
                                              budgetLinesAtlas.atlas_account
                                                .name
                                            }
                                          </h5>
                                          <h5 className="modal-title">
                                            Aprobado:{' '}
                                            {formatMoney(
                                              budgetLinesAtlas.buddgetstart
                                            )}{' '}
                                          </h5>
                                          <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            <span aria-hidden="true">
                                              &times;
                                            </span>
                                          </button>
                                        </div>
                                        <form>
                                          <div className="modal-body">
                                            <p className="modal-title">
                                              Descripción:{' '}
                                              {budgetLinesAtlas.description}
                                            </p>

                                            <div
                                              style={{
                                                width: '47%',
                                                display: 'inline-block',
                                              }}
                                            >
                                              <select
                                                onChange={onChanceSupplier}
                                                name="select_suppliers"
                                                className="form-control mt-3"
                                              >
                                                <option value="#">
                                                  Seleccione
                                                  Beneficiario/Proveedor
                                                </option>
                                                {suppliers.map((supplier) => (
                                                  <option
                                                    key={supplier.id}
                                                    value={supplier.id}
                                                  >
                                                    {supplier.contact_name}{' '}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                            <div
                                              style={{
                                                width: '47%',
                                                display: 'inline-block',
                                                marginLeft: '5px',
                                              }}
                                            >
                                              <input
                                                name="balance"
                                                onChange={onChanceBalance}
                                                type="text"
                                                className="form-control"
                                                placeholder="Valor Ejecutado 00.00"
                                              />
                                            </div>

                                            <div
                                              style={{
                                                width: '47%',
                                                display: 'inline-block',
                                                marginTop: '15px',
                                              }}
                                            >
                                              <input
                                                name="code"
                                                onChange={onChanceCode}
                                                type="text"
                                                className="form-control"
                                                placeholder="Ingrese Codigo de Identificación: 101 "
                                              />
                                            </div>

                                            <div
                                              style={{
                                                width: '47%',
                                                display: 'inline-block',
                                                marginTop: '15px',
                                                marginLeft: '5px',
                                              }}
                                            >
                                              <input
                                                onChange={onChangeStartDate}
                                                className="form-control mt-3"
                                                type="date"
                                                placeholder="Fecha"
                                              />
                                            </div>
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-default waves-effect "
                                              data-dismiss="modal"
                                              id={
                                                'btn_cerrar_aprobar_' +
                                                budgetLinesAtlas.id
                                              }
                                            >
                                              Cerrar
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                onClickAprobar(
                                                  budgetLinesAtlas.id
                                                )
                                              }
                                              className="btn btn-primary waves-effect waves-light "
                                            >
                                              Guardar
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>

                                  {/*FINAL Modal APROBAR*/}

                                  <ModalVerFilesAtlas
                                    budget_id={budget_id}
                                    idProject={idProject}
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
                                    id={'archivos_' + budgetLinesAtlas.id}
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
                                              budgetLinesAtlas.balance
                                            )}{' '}
                                          </h4>
                                          <button
                                            id={
                                              'btnCerrarSF_' +
                                              budgetLinesAtlas.id
                                            }
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
                                          action={`${API_URL}/files`}
                                          method="post"
                                          encType="multipart/form-data"
                                        >
                                          <div class="modal-body">
                                            <div className="form-control mt-3">
                                              <input
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                name="photo"
                                                id="photo"
                                                type="file"
                                              ></input>
                                            </div>
                                            <input
                                              value={budgetLinesAtlas.id}
                                              name="budgetlineatlas_id"
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
                                                onChange={onClickNombreArchivo}
                                                type="text"
                                                className="form-control"
                                                placeholder="Ingrese Nombre de Archivo "
                                                required
                                              />
                                            </div>
                                            <div>
                                              <select
                                                onChange={onClickFaseArchivo}
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
                                              type="submit"
                                              class="btn btn-default waves-effect "
                                              data-dismiss="modal"
                                            >
                                              Cerrar
                                            </button>
                                            {/* <button type="button" onClick={ () =>onClickSubirArchivo(budgetLinesAtlas.id )} class="btn btn-primary waves-effect waves-light ">Guardar</button> */}
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
                                  {/* FINAL DE SUBIR ARCHIVOS */}

                                  {/*   <div
                                    class="modal fade"
                                    id={'rembolsar_' + budgetLinesAtlas.id}
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
                                            )}{' '}
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
                                              style={{ width: '100%' }}
                                              id=""
                                              cols="30"
                                              rows="10"
                                            ></textarea>
                                          </div>
                                          <input
                                            type="hidden"
                                            name={
                                              'input_rembolsar_' +
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
                                 */}
                                </tr>
                              ))
                            : null}
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
                  id="btnCloseNew"
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
                  <input
                    name=""
                    type="hidden"
                    className="form-control mt-3"
                    value={idProject}
                  />

                  <div style={{ width: '50%', display: 'inline-block' }}>
                    {/* Select de Resultados Atlas */}
                    <select
                      onChange={onChanceResultAtlas}
                      name="select_result_atlas"
                      className="form-control mt-3"
                    >
                      <option value="#">Seleccione Resultado Atlas</option>
                      {resultados_atlas.map((resultado_atlas) => (
                        <option value={resultado_atlas.code}>
                          ({resultado_atlas.code})-{resultado_atlas.name}{' '}
                        </option>
                      ))}
                    </select>
                    {/* FIn del Select de Resultados Atlas */}
                  </div>

                  <div style={{ width: '50%', display: 'inline-block' }}>
                    {/* Select de Productos Atlas */}
                    <select
                      onChange={onChanceProductAtlas}
                      name="select_product_atlas"
                      className="form-control mt-3"
                    >
                      <option value="#">Seleccione Producto Atlas</option>
                      {products_atlas.map((product_atlas) => (
                        <option value={product_atlas.code}>
                          ({product_atlas.code})-{product_atlas.name}{' '}
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
                          ({activity_atlas.code})-{activity_atlas.name}{' '}
                        </option>
                      ))}
                    </select>
                    {/* FIn del Select de Productos Atlas */}
                  </div>

                  <div style={{ width: '50%', display: 'inline-block' }}>
                    {/* Select de Cuentas Atlas */}
                    <select
                      onChange={onChanceAccountAtlas}
                      name="select_account_atlas"
                      className="form-control mt-3"
                    >
                      <option value="#">Seleccione Cuenta Atlas</option>
                      {accounts_atlas.map((account_atlas) => (
                        <option value={account_atlas.id}>
                          {account_atlas.name}{' '}
                        </option>
                      ))}
                    </select>
                    {/* FIn del Select de Cuentas Atlas */}
                  </div>

                  <div style={{ width: '50%', display: 'inline-block' }}>
                    {/* Select de Sub-Cuentas Atlas */}
                    <select
                      onChange={onChanceSubAccountAtlas}
                      name="select_sub_account_atlas"
                      className="form-control mt-3"
                    >
                      <option value="#">Seleccione Cuenta IHCAFE</option>
                      {sub_accounts_atlas.map((sub_account_atlas) => (
                        <option value={sub_account_atlas.id}>
                          {sub_account_atlas.name}{' '}
                        </option>
                      ))}
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
                  <div style={{ width: '50%', display: 'inline-block' }}>
                    <select
                      onChange={onChanceAccount}
                      name="select_account_money"
                      className="form-control mt-3"
                    >
                      <option value="#">Seleccione Cuenta de Origen</option>

                      {accounts.map((cuenta) => (
                        <option value={cuenta.id}>
                          ({cuenta.coin.code})-{cuenta.name}{' '}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*  <div style={{ width: '50%', display: 'inline-block' }}>
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
                          {supplier.contact_name}{' '}
                        </option>
                      ))}
                    </select>
                  </div>
 */}
                  <div style={{ width: '50%', display: 'inline-block' }}>
                    {/* <label htmlFor="">Aprobado</label> */}

                    <input
                      name="buddgetstart"
                      type="number"
                      onChange={onChanceBudgetStart}
                      type="text"
                      className="form-control"
                      placeholder="valor Aprobado : 0,000.00 "
                      //value={budgetLine.budgetstart}
                    />
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

                  {/* <div style={{ width: '25%', display: 'inline-block' }}>
                    <label htmlFor="">Inicial</label>

                    <input
                      name="buddgetstart"
                      onChange={onChanceBudgetStart}
                      type="text"
                      className="form-control"
                      placeholder="valor Inicial : 0,000.00 "
                    />
                  </div>
                  <div style={{ width: '25%', display: 'inline-block' }}>
                    <label htmlFor="">Modificado</label>

                    <input
                      name="buddgetupdate"
                      onChange={onChanceBudgeUpdate}
                      type="text"
                      className="form-control"
                      placeholder="valor Modificado : 0,000.00 "
                    />
                  </div>
                  <div style={{ width: '25%', display: 'inline-block' }}>
                    <label htmlFor="">Actual</label>

                    <input
                      name="buddgetactual"
                      onChange={onChanceBudgetActual}
                      type="text"
                      className="form-control"
                      placeholder="valor Actual : 0,000.00 "
                    />
                  </div>
                  <div style={{ width: '25%', display: 'inline-block' }}>
                    <label htmlFor="">En Ejecucion</label>

                    <input
                      name="buddgetfinal"
                      onChange={onChancebuddgetFinal}
                      type="text"
                      className="form-control"
                      placeholder="valor Ejecucion : 0,000.00 "
                    />
                  </div>
 
                  <div
                    style={{
                      width: '33%',
                      display: 'inline-block',
                      marginTop: '15px',
                    }}
                  >
                    <label htmlFor="">Disponible</label>

                    <input
                      name="balance"
                      onChange={onChanceBalance}
                      type="text"
                      className="form-control"
                      placeholder="Valor Disponible"
                    />
                  </div>
*/}
                  {/*    <div
                    style={{
                      width: '33%',
                      display: 'inline-block',
                      marginTop: '15px',
                    }}
                  >
                    <label htmlFor="">Codigo de Identificación</label>

                    <input
                      name="code"
                      onChange={onChanceCode}
                      type="text"
                      className="form-control"
                      placeholder="Codigo de Identificación: 01-101-01 "
                    />
                  </div>

                  <div
                    style={{
                      width: '33%',
                      display: 'inline-block',
                      marginTop: '15px',
                    }}
                  >
                    <label htmlFor="">Fecha</label>
                    <input
                      onChange={onChangeStartDate}
                      class="form-control "
                      type="date"
                      placeholder="Fecha"
                    />
                  </div>
 */}

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

export default TableCostAtlas;
