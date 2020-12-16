import React, { Component } from 'react'
import TabladeActividades from './TabladeActividades'

export default class TabladeProductos extends Component {
    _isMounted_P = true
    constructor() {
        super()

        this.state = {
            ArrayProducts: []
        };
    }

    async componentDidMount() {

        this.setState({ ArrayProducts: [] })

        const { handleSetProducts } = this.props

        fetch('http://localhost:4000/api/atlas/productos/' + this.props.code_resultado)
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {

                if (this._isMounted_P) {
                    this.setState({ ArrayProducts: recurso.productos_atlas })
                    //console.log("VAl=" + recurso.productos_atlas[0].id)
                    handleSetProducts(recurso.productos_atlas)
                }

                /*this.state.activities.map((A) => (
                    console.log("Activity=" + A.name + " Id=" + A.id + " Code=" + A.code)
                ))*/
            })

        //this._isMounted = true

        //console.log("Entre a Productos")
        //console.log("Buscando Productos de Codigox=" + this.props.code_resultado)
        //alert("Buscando Productos de Codigox=" + this.props.code_resultado)

        /*const res2 = await axios.get(
            "http://localhost:4000/api/atlas/productos/" + this.props.code_resultado
        )*/

        /*handleSetProducts(res2.data.productos_atlas){*/
        /*if (this._isMounted) {*/

        //this.setState({ ArrayProducts: res2.data.productos_atlas })
        /*}*/
        /*}*/

        /*this.state.ArrayProducts.map((AP) => (
            console.log("ArrayProducts=" + AP.name + " ID=" + AP.id + " Code=" + AP.code)
        ))*/

    }

    componentWillUnmount() {
        this._isMounted_P = false;
    }

    render() {
        return (
            <table className="table table-striped " >
                <tbody>

                    {
                        this.state.ArrayProducts.map((Product) => (
                            <tr key={Product.id}>
                                <td style={{ border: '1px solid' }}>
                                    {Product.code} -{Product.name}
                                </td>
                                <td style={{ border: '1px solid' }}> <strong>Actividades</strong>
                                    < TabladeActividades
                                        key={Product.id}
                                        code_producto={Product.code}
                                        budget_atlas_id={this.props.budget_atlas_id}
                                    />

                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}
