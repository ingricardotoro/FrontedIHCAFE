import React, { Component } from 'react'
import axios from 'axios'
import RowCardsProjects from '../components/RowCardsProjects'
import RowBudget from '../components/RowBudget'

export default class TableCost extends Component {
    
    constructor() {
        super();
        this.state = {
            budgetLines:[],
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
            cuentas:[]
            
         
        }
    }
    
    async componentDidMount(){

        const res = await axios.post('http://localhost:4000/api/budgetlines/project/'+this.props.idProject);
        this.setState({budgetLines:res.data.budgetLines});

        const res2 = await axios.post('http://localhost:4000/api/budgetlines/cat_project/'+this.props.idProject);
        this.setState({budgetLinesCat:res2.data.budgetCategories});

        const res3 = await axios.get('http://localhost:4000/api/projects/');
        this.setState({projects:res3.data.projects});

        const res4 = await axios.get('http://localhost:4000/api/categories/categories_parents/');
        this.setState({categories:res4.data.categories});

        const res6 = await axios.get('http://localhost:4000/api/accounts/');
        this.setState({cuentas:res6.data.cuentas});
       

    }

    calculo(){ // para realizar el calculo de la suma de presupuestos

        this.state.total_inicial=0.0;this.state.total_ejecutado=0.0; this.state.total_disonible=0.0;
        for (let index = 0; index < this.state.budgetLines.length; index++) {
            this.state.total_inicial= this.state.total_inicial + this.state.budgetLines[index].buddgetstart;
            this.state.total_ejecutado= this.state.total_ejecutado +this.state.budgetLines[index].buddgetfinal;
            this.state.total_disonible= this.state.total_disonible + this.state.budgetLines[index].balance;
        }

        this.porcentaje_ejecutado = (this.state.total_ejecutado * 100 )/this.state.total_inicial;
        this.porcentaje_disponible = (this.state.total_disonible * 100 )/this.state.total_inicial;
        this.porcentaje_rembolsos = (this.state.total_rembolsos * 100 )/this.state.total_inicial;

    }

    /**********************LLENADO PARA EL SAVE********* */
    onChanceProject = (e) => {this.setState({project_id: e.target.value})}
    onChanceClasificacion = async (e) => {
        this.setState({code: e.target.value});
        const res7 = await axios.get('http://localhost:4000/api/categories/child/'+e.target.value);
        this.setState({name:res7.data.child.name});
    }
    onChangeStartDate = (e) => {this.setState({startdate: e.target.value})}
    onChangeEndDate = (e) => {this.setState({enddate: e.target.value})}
    onChanceAccount = (e) => {this.setState({account_id: e.target.value})}
    onChanceBudget = (e) => {this.setState({buddgetstart: e.target.value});this.setState({balance: e.target.value});}
    /**********************fINAL DEL LLENADO PARA EL SAVE********* */

    onChanceCategory = async (e) => {
        this.setState({category_id: e.target.value });
        const res5 = await axios.get('http://localhost:4000/api/categories/categories_childs/'+e.target.value);
        this.setState({clasificaciones:res5.data.clasificaciones});
    }

    formatMoney(number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'HNL' });
    }
    
    //codigo para crear un nuevo renglon presupuestario
    onSubmit  = async e =>{
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/api/budgetlines',{
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
        window.location.href = 'http://localhost:3000/budgets'
       
    }

    render() {

      this.calculo();
      
        return (
            <div>
               
                <RowCardsProjects 
                    inicial={this.state.total_inicial} 
                    ejecutado={this.state.total_ejecutado}
                    disponible={this.state.total_disonible}
                    rembolsos={this.state.total_rembolsos}
                    porcentaje_ejecutado={this.porcentaje_ejecutado}
                    porcentaje_disponible={this.porcentaje_disponible}
                    porcentaje_rembolsos={this.porcentaje_rembolsos}
                />

                {/* Page body start */}
                <div className="page-body">
                <div className="row">
                    <div className="col-sm-12">
                    {/* Product list card start */}
                    <div className="card product-add-modal">
                        <div className="card-header">
                            <h5>Renglones Presupuestarios  </h5>
                            
                            <button type="button" className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger" data-toggle="modal" data-target="#modal-13"><i className="icofont icofont-plus m-r-5" /> Crear Nuevo</button>
                        </div>
                        
                        {this.state.budgetLinesCat.map(bLinesCat => 
                           
                            <RowBudget idCat={bLinesCat.category_id}  idProject={this.props.idProject} />
                           
                        )}

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
                        <h4 className="modal-title">Crear Nuevo Renglón Presupuestario</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            
                            <form onSubmit={this.onSubmit}>
                                <select onChange={this.onChanceProject} name="select" className="form-control mt-3">
                                    <option value="#">Seleccione Proyecto</option>
                                    {
                                        this.state.projects.map(project => 
                                            <option value={project.id}>({project.code})-{project.name} </option>
                                        )
                                    }

                                </select>

                                <select onChange={this.onChanceCategory} name="select" className="form-control mt-3">
                                    <option value="#">Seleccione Categoría</option>
                                   {  
                                        this.state.categories.map(category => 
                                            <option value={category.code}>({category.code})-{category.name} </option>
                                        )
                                    } 

                                </select>

                                <select onChange={this.onChanceClasificacion} name="select" className="form-control mt-3">
                                    <option value="#">Seleccione Clasificación de Renglón</option>
                                    {  
                                         this.state.clasificaciones.map(clasificacion => 
                                            <option value={clasificacion.code}>({clasificacion.code})-{clasificacion.name} </option>
                                        )
                                    } 

                                </select>

                                <select onChange={this.onChanceAccount} name="select" className="form-control mt-3">
                                    <option value="#">Seleccione Cuenta de Origen</option>
                                    {  
                                         this.state.cuentas.map(cuenta => 
                                            <option value={cuenta.id}>({cuenta.coin}-{cuenta.actualbalance})-{cuenta.name} </option>
                                        )
                                    } 

                                </select>

                                <div className="input-group mt-3">
                                    <span className="input-group-addon"><i className="icofont icofont-cur-dollar" /></span>
                                    <input onChange={this.onChanceBudget} type="text" className="form-control" placeholder="Ingrese Prespuesto de Inicio " />
                                </div>
                               
                                <div style={{width:'50%', display:'inline-block'}} >
                                    <input onChange={this.onChangeStartDate} class="form-control mt-3" type="date" placeholder="Fecha de Inicio" />
                                    <label htmlFor="">Fecha de Inicio</label>
                                </div>
                                <div style={{width:'50%', display:'inline-block'}} >
                                    <input onChange={this.onChangeEndDate} class="form-control mt-3" type="date" placeholder="Fecha de Final" />
                                    <label htmlFor="">Fecha de Finalización</label>
                                </div>

                            
                       
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default waves-effect " data-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-primary waves-effect waves-light ">Guardar</button>
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
        )
    }
}
