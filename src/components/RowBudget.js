import React, { Component } from 'react'
import axios from 'axios'

export default class RowBudget extends Component {

    constructor() {
        super();
        this.state = {
            budgetLines: [],
            total_disponible: 0.0,
            total_ejecutado: 0.0,
            total_inicial: 0.0,

            total_solicitado: 0.0,

            nameCategory: "Gastos",
            //para guardar la desicion de aprobar o no el budgetline
            aprobar: 0

        }
    }

    async componentDidMount() {

        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        const res = await axios.post('http://localhost:4000/api/budgetlines/project/category/' + this.props.idProject + '/' + this.props.idCat);
        this.setState({ budgetLines: res.data.budgetLinesCat });

        const res3 = await axios.post('http://localhost:4000/api/categories/categoriesbyid/' + this.props.idCat);
        this.setState({ nameCategory: res3.data.category.name });
    }

    formatMoney(number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'HNL' });
    }

    onchangeSelectAprobar = (e) => { this.setState({ aprobar: e.target.value }) };
    //const multiplyES6 = (x, y) => { return x * y };
    onSubmitAprobar = async (budgetLine_id) => {
        //e.preventDefault();

        //const res_aprobar = await axios.post('http://localhost:4000/api/budgetlines/aprobar/'+budgetLine_id+'/'+this.state.aprobar);
    }

    calculo() { // para realizar el calculo de la suma de presupuestos

        this.state.total_inicial = 0.0; this.state.total_ejecutado = 0.0; this.state.total_disponible = 0.0; this.state.total_solicitado = 0.0;
        /*this.setSate(this.state.total_inicial, 0.0);
        this.setSate(this.state.total_ejecutado, 0.0);
        this.setSate(this.state.total_disponible, 0.0);
        this.setSate(this.state.total_solicitado, 0.0);*/

        for (let index = 0; index < this.state.budgetLines.length; index++) {

            if (this.state.budgetLines[index].status === 'Solicitado') {
                this.state.total_solicitado = this.state.total_solicitado + this.state.budgetLines[index].buddgetstart;
                //this.setState(this.state.total_solicitado , this.state.total_solicitado + this.state.budgetLines[index].buddgetstart);

            } else {
                this.state.total_inicial += this.state.budgetLines[index].buddgetstart;
                this.state.total_ejecutado += this.state.budgetLines[index].buddgetfinal;
                this.state.total_disponible += this.state.budgetLines[index].balance;

                /*this.setState(this.state.total_inicial, this.state.total_inicial + this.state.budgetLines[index].buddgetstart);
                this.setState(this.state.total_ejecutado, this.state.total_ejecutado +this.state.budgetLines[index].buddgetfinal);
                this.setState(this.state.total_disponible, this.state.total_disponible + this.state.budgetLines[index].balance); 
                */
            }

        }
    }

    render() {
        this.calculo();

        return (
            <div>   <hr /><h4 className="ml-5 mt-2">{this.state.nameCategory}</h4>
                <div className="card-block">
                    <div className="table-responsive">
                        <div className="table-content">
                            <div className="dt-responsive table-responsive">
                                <table id="e-product-list" className="table table-striped table-bordered nowrap">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Proveedor</th>
                                            <th>Inicial</th>
                                            <th>Ejecutado</th>
                                            <th>Discponible</th>
                                            <th>Estado</th>
                                            <th>Rembolsar</th>

                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.budgetLines.map(budgetLine =>

                                                <tr key={budgetLine.id} >
                                                    {/* {this.suma(budgetLine.buddgetstart, budgetLine.buddgetfinal,budgetLine.balance)}  */}

                                                    <td className="pro-name">
                                                        <label className="text-danger">{budgetLine.code}</label>
                                                    </td>
                                                    <td className="pro-name">
                                                        <h6>{budgetLine.name}</h6>

                                                    </td>
                                                    <td>
                                                        <label >{budgetLine.person.fullname}</label>
                                                    </td>
                                                    <td>
                                                        <label className="text-info"> {this.formatMoney(budgetLine.buddgetstart)}</label>
                                                    </td>
                                                    <td>
                                                        <label className="text-danger"> {this.formatMoney(budgetLine.buddgetfinal)}</label>
                                                    </td>
                                                    <td>
                                                        <label className="text-success"> {this.formatMoney(budgetLine.balance)}</label>
                                                    </td>

                                                    {budgetLine.status === 'Solicitado'

                                                        ? <td><button type="button" class="btn btn-success waves-effect" data-toggle="modal" data-target={'#aprobar_' + budgetLine.id}>Decidir</button> </td>
                                                        : <td><label >{budgetLine.status}</label></td>
                                                    }

                                                    {budgetLine.status === 'Aprobado'

                                                        ? <td><button type="button" class="btn btn-warning waves-effect" data-toggle="modal" data-target={'#rembolsar_' + budgetLine.id}>Rembolsar</button></td>
                                                        : <td align="center"><label >---</label></td>
                                                    }


                                                    <td align="center" className="action-icon">
                                                        <a href="#!" className="m-r-15 text-muted" data-toggle="tooltip" data-placement="top" title data-original-title="Edit"><i className="icofont icofont-ui-edit" /></a>
                                                        <a href="#!" className="text-muted" data-toggle="tooltip" data-placement="top" title data-original-title="Delete"><i className="icofont icofont-delete-alt" /></a>
                                                    </td>



                                                    <div class="modal fade" id={'aprobar_' + budgetLine.id} tabindex="-1" role="dialog">
                                                        <div class="modal-dialog modal-lg" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h4 class="modal-title">{budgetLine.name}-{this.formatMoney(budgetLine.buddgetstart)} </h4>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <form >

                                                                    <div class="modal-body">
                                                                        <select onChange={this.onchangeSelectAprobar} name="select" className="form-control mt-3">
                                                                            <option value="0">Seleccion Opción</option>
                                                                            <option value="1">SI APROBAR</option>
                                                                            <option value="2">NO APROBAR</option>
                                                                        </select>

                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-default waves-effect " data-dismiss="modal">Cerrar</button>
                                                                        <button type="submit" class="btn btn-primary waves-effect waves-light ">Guardar</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="modal fade" id={'rembolsar_' + budgetLine.id} tabindex="-1" role="dialog">
                                                        <div class="modal-dialog modal-lg" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h4 class="modal-title">Rembolsar {budgetLine.name}-{this.formatMoney(budgetLine.buddgetstart)} </h4>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body" align="center">

                                                                    <div>
                                                                        <label htmlFor="">Descripción del Rembolso</label>
                                                                        <textarea className="form-control" style={{ width: '100%' }} id="" cols="30" rows="10">

                                                                        </textarea>
                                                                    </div>
                                                                    <input type="hidden" name={"input_rembolsar_" + budgetLine.id} value={budgetLine.id} />
                                                                    <div className="mt-3">
                                                                        <button type="button" className="btn btn-primary waves-effect waves-light ">Reembolsar</button>
                                                                    </div>

                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-default waves-effect " data-dismiss="modal">Cerrar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </tr>
                                            )
                                        }

                                        <tr>
                                            <td align="center" className="pro-name">
                                                <label className="text-danger">---</label>
                                            </td>
                                            <td className="pro-name">
                                                <h6>Total de Prespuesto APROBADO</h6>
                                                <span>Suma de los Totales</span>
                                            </td>
                                            <td align="center">
                                                <label >---</label>
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
                                            <td align="center">
                                                <label >---</label>
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
                                        </tr>

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
