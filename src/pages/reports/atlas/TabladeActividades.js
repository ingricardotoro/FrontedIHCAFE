import React, { Component } from 'react'
import axios from 'axios'


export default class TabladeActividades extends Component {

    _isMounted_A = true

    constructor() {
        super()

        this.state = {
            activities: [],
            projects: [],
            atlasaccounts: []
        };
    }

    async componentDidMount() {

        this.setState({ activities: [] })

        //  console.log("Code=" + this.props.code_producto)
        console.log("Buscando Actividades de Codigo=" + this.props.code_producto)

        fetch('http://localhost:4000/api/atlas/productos/' + this.props.code_producto)
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                if (this._isMounted_A) {

                    this.setState({ activities: recurso.productos_atlas })

                    /*this.state.activities.map((A) => (
                        console.log("Activity=" + A.name + " Id=" + A.id + " Code=" + A.code)
                    ))*/
                }
            })

        const res_p2 = await axios.post(
            "http://localhost:4000/api/projects/findProjectsByBudgetId/" +
            this.props.budget_atlas_id
        );
        this.setState({ projects: res_p2.data.projectsbybudgetid });
    }

    componentWillUnmount() {
        this._isMounted_A = false;
    }

    async BuscarCuentaAtlas(project_id, code_activity) {

        const res_p3 = await axios.post(
            "http://localhost:4000/api/budgetlines/atlas/findAtlasAccountsByProjAct/" + project_id + "/" + code_activity
        );
        //this.setState({ atlasaccounts: res_p3.data.atlasaccounts });
    }

    render() {

        return (
            <table className="table table-striped" >
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid' }}>Descripción</td>
                        <td style={{ border: '1px solid' }}>Q1</td>
                        <td style={{ border: '1px solid' }}>Ejec</td>
                        <td style={{ border: '1px solid' }}>Q2</td>
                        <td style={{ border: '1px solid' }}>Ejec</td>
                        <td style={{ border: '1px solid' }}>Q3</td>
                        <td style={{ border: '1px solid' }}>Ejec</td>
                        <td style={{ border: '1px solid' }}>Q4</td>
                        <td style={{ border: '1px solid' }}>Ejec</td>
                    </tr>
                    {
                        this.state.activities.map((Activity) => (
                            <tr key={Activity.id} >
                                <td
                                    style={{ border: '1px solid' }}>
                                    {Activity.code} -{Activity.name}-{Activity.code_atlas}
                                </td>


                                {this.state.projects.map((project) => (

                                    <>
                                        {this.BuscarCuentaAtlas(13, '1.11.1')}
                                        {this.state.atlasaccounts.map((atlas) => (
                                            <tr>
                                                <td style={{ border: '1px solid' }}>{"P=" + this.props.code_producto + " A=" + Activity.code + " PJ=" + project.id}</td>
                                            </tr>
                                        ))}
                                    </>
                                ))}


                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}
