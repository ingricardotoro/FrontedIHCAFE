import React, { Component } from 'react'
import axios from 'axios'
import ResultadoByProyect from './ResultadoByProyect'

export default class TabladeActividades extends Component {

    _isMounted_A = true

    constructor() {
        super()

        this.state = {
            activities: [],
            /*projects: [],
            atlasaccounts: []*/
        };
    }

    async componentDidMount() {

        this.setState({ activities: [] })

        //  console.log("Code=" + this.props.code_producto)
        console.log("Buscando Actividades de Codigo=" + this.props.code_producto)

        const res_pp3 = await axios.get(
            "http://167.99.15.83/api/atlas/productos/" + this.props.code_producto
        );
        this.setState({ activities: res_pp3.data.productos_atlas })


        /*fetch('http://167.99.15.83/api/atlas/productos/' + this.props.code_producto)
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                if (this._isMounted_A) {

                    this.setState({ activities: recurso.productos_atlas })*/

        /*this.state.activities.map((A) => (
            console.log("Activity=" + A.name + " Id=" + A.id + " Code=" + A.code)
        ))*/
        /* }
     })*/

    }

    componentWillUnmount() {
        alert("desmontando Activity")
        this._isMounted_A = false;
    }


    render() {

        return (
            <div>

                <table className="table table-striped" >
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid' }}>Descripción</td>
                            <td style={{ border: '1px solid' }}>ATLAS</td>
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
                            this.state.activities.map(Activity => (

                                <tr key={Activity.id}>
                                    <td
                                        style={{ border: '1px solid' }} >
                                        {Activity.code} -{Activity.name}-{Activity.code_atlas}
                                    </td>

                                    <ResultadoByProyect
                                        key={Activity.id}
                                        activity_code={Activity.code}
                                        budget_atlas_id={this.props.budget_atlas_id}
                                    />

                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
