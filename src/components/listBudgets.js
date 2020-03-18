import React, { Component } from 'react'
import axios from 'axios'

import TabBudget from '../components/TabBudget'

export default class listBudgets extends Component {

    constructor() {
        super();
        this.state = {
            budgets:[]
        }
    }
    
    async componentDidMount(){
      const res = await axios.get('http://localhost:4000/api/budgets/');
      this.setState({budgets:res.data.budgets});
    }

    render() {
        return (
            <div>
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        <div className="main-body">
                            <div className="page-wrapper">
                                <div className="page-header page-wrapper">
                                    <div className="page-header-title">
                                        <h4>Presupuestos</h4>
                                        <span>Listado de Presupuestos Creados</span>
                                    </div>
                                    <div className="page-header-breadcrumb">
                                        <ul className="breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="icofont icofont-home"></i>
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item"><a href="#!">Pages</a>
                                            </li>
                                        </ul>
                                    </div>
                                 </div>
                                 
                                {    
                                    this.state.budgets.map( budget =>   
                                     
                                      <TabBudget 
                                        nombre={budget.name} 
                                        id={budget.id} 
                                        description={budget.description} 
                                        account={budget.account.name} 
                                        budgetstart={budget.buddgetstart} 
                                        budgetupdate={budget.buddgeupdate} 
                                        balance={budget.balance} 
                                        returns={budget.returns} 
                                       
                                     />
                                    )
                                }
                            </div>
                        </div>
                        <div id="styleSelector">
                            
                        </div>
                    </div>
                </div>    
            </div>
        )
    }
}
