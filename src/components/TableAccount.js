import React, { Component } from 'react';
import RowCardsProjects from '../components/RowCardsProjects';
import RowBudget from '../components/RowBudget';

export default class TableAccount extends Component {
  constructor() {
    super();
    this.state = {
      /*budgetLines:[],
            budgetLinesCat:[],
            projects:[],
            
            total_disonible:0.0,
            total_ejecutado:0.0,
            total_inicial:0.0,
            total_rembolsos:0.0,

            porcentaje_disponible:0.0,
            porcentaje_ejecutado:0.0,
            porcentaje_rembolsos:0.0,

            //para el modal
            code:'',
            name:'',
            project_id:0,
            category_id:0,
            user_id:1,
            status:'Solicitado',
            supplier_id : 1,
            startdate:'',
            enddate:'',
            account_id:0,
            buddgetstart:0.0,
            buddgeupdate:0.0,
            buddgetfinal:0.0,
            balance:0.0,
            balance:false,

            categories:[],
            clasificaciones:[],
            cuentas:[]*/
    };
  }

  async componentDidMount() {
    //verificacion de usuario logeado
    if (!localStorage.usertoken) {
      window.location.href = '/';
    }

    /*const res = await axios.post('https://api.ihcafe.hn/api/budgetlines/project/'+this.props.idProject);
        this.setState({budgetLines:res.data.budgetLines});

        const res2 = await axios.post('https://api.ihcafe.hn/api/budgetlines/cat_project/'+this.props.idProject);
        this.setState({budgetLinesCat:res2.data.budgetCategories});

        const res3 = await axios.get('https://api.ihcafe.hn/api/projects/');
        this.setState({projects:res3.data.projects});

        const res4 = await axios.get('https://api.ihcafe.hn/api/categories/categories_parents/');
        this.setState({categories:res4.data.categories});

        const res6 = await axios.get('https://api.ihcafe.hn/api/accounts/');
        this.setState({cuentas:res6.data.cuentas});*/
  }

  /*calculo(){ // para realizar el calculo de la suma de presupuestos

        this.state.total_inicial=0.0;this.state.total_ejecutado=0.0; this.state.total_disonible=0.0;
        for (let index = 0; index < this.state.budgetLines.length; index++) {
            this.state.total_inicial= this.state.total_inicial + this.state.budgetLines[index].buddgetstart;
            this.state.total_ejecutado= this.state.total_ejecutado +this.state.budgetLines[index].buddgetfinal;
            this.state.total_disonible= this.state.total_disonible + this.state.budgetLines[index].balance;
        }

        this.porcentaje_ejecutado = (this.state.total_ejecutado * 100 )/this.state.total_inicial;
        this.porcentaje_disponible = (this.state.total_disonible * 100 )/this.state.total_inicial;
        this.porcentaje_rembolsos = (this.state.total_rembolsos * 100 )/this.state.total_inicial;

    }*/

  /**********************LLENADO PARA EL SAVE********* */
  /*onChanceProject = (e) => {this.setState({project_id: e.target.value})}
    onChanceClasificacion = async (e) => {
        this.setState({code: e.target.value});
        const res7 = await axios.get('https://api.ihcafe.hn/api/categories/child/'+e.target.value);
        this.setState({name:res7.data.child.name});
    }
    onChangeStartDate = (e) => {this.setState({startdate: e.target.value})}
    onChangeEndDate = (e) => {this.setState({enddate: e.target.value})}
    onChanceAccount = (e) => {this.setState({account_id: e.target.value})}
    onChanceBudget = (e) => {this.setState({buddgetstart: e.target.value});this.setState({balance: e.target.value});}*/
  /**********************fINAL DEL LLENADO PARA EL SAVE********* */

  /*onChanceCategory = async (e) => {
        this.setState({category_id: e.target.value });
        const res5 = await axios.get('https://api.ihcafe.hn/api/categories/categories_childs/'+e.target.value);
        this.setState({clasificaciones:res5.data.clasificaciones});
    }*/

  /*formatMoney(number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'HNL' });
    }*/

  //codigo para crear un nuevo renglon presupuestario
  /*onSubmit  = async e =>{
        e.preventDefault();
        const res = await axios.post('https://api.ihcafe.hn/api/budgetlines',{
            code:this.state.code,
            name:this.state.name,
            status:this.state.status,
            project_id:this.state.project_id,
            user_id:this.state.user_id,
            status:this.state.status,
            supplier_id : this.state.supplier_id,
            startdate:this.state.startdate,
            enddate:this.state.enddate,
            account_id:this.state.account_id,
            buddgetstart:this.state.buddgetstart,
            buddgeupdate:this.state.buddgeupdate,
            buddgetfinal:this.state.buddgetfinal,
            balance:this.state.balance,
            category_id:this.state.category_id
        })
        window.location.href = 'https://ihcafe-35ae7.firebaseapp.com//budgets'
       
    }*/

  render() {
    //this.calculo();

    return (
      <div>
        <RowCardsProjects
          inicial="100000.00"
          ejecutado="100000.00"
          disponible="100000.00"
          rembolsos="0.0"
          porcentaje_ejecutado="50%"
          porcentaje_disponible="50%"
          porcentaje_rembolsos="0%"
        />

        {/* Page body start */}
        <div className="page-body">
          <div className="row">
            <div className="col-sm-12">
              {/* Product list card start */}
              <div className="card product-add-modal">
                <div className="card-header">
                  <h5>Historial de Movimientos </h5>

                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger"
                    data-toggle="modal"
                    data-target="#modal-13"
                  >
                    <i className="icofont icofont-plus m-r-5" /> Crear Nuevo
                  </button>
                </div>

                <RowBudget idCat={1} idProject={1} />
              </div>
              {/* Product list card end */}
            </div>
          </div>
        </div>

        {/* Add Contact Start Model */}

        {/* Page body end */}
      </div>
    );
  }
}
