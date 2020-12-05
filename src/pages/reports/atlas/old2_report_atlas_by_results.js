import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'


export default class ReportAtlasByResults extends Component {
    _isMounted_R = true
    constructor() {
        super()

        this.state = {
            ArrayResults: [],
            products: [],
            ArrayProducts: []
        };
    }

    async componentDidMount() {

        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        /*fetch('http://190.92.73.69:4000/api/atlas/resultados/')
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                console.log("HOLA")
                if (this._isMounted_R) {

                    this.setState({ ArrayResults: recurso.atlas_resultados })
                }
                console.log("Array=" + this.state.ArrayResults[0].details)

            })*/
    }

    componentWillUnmount() {
        this._isMounted_R = false;
    }

    async buscarProductos(code_resultado) {

        const res = await axios.get(
            "http://190.92.73.69:4000/api/atlas/productos/" + code_resultado
        )
        this.setState({ ArrayProducts: res.data.productos_atlas })
    }

    formatMoney(number) {
        if (this.props.match.params.coin_id == 1) {
            return number.toLocaleString("en-US", {
                style: "currency",
                currency: "HNL",
            });
        }

        if (this.props.match.params.coin_id == 2) {
            return number.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        }
        //return number;
    }


    render() {

        return (
            <div>
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        {/* Main-body start */}
                        <div className="main-body">
                            <div className="page-wrapper">
                                {/* Page-header start */}
                                <div className="page-header mt-5">
                                    <div className="page-header-title">
                                        <button className="btn btn-block btn-success" onClick={() => exportTableToExcel('report', 'Reporte por Proyecto')} type="primary">Exportar en Excel </button>
                                    </div>
                                    <div className="page-header-breadcrumb">
                                        <ul className="breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="icofont icofont-home" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item"><Link to={'/reports_atlas'} >Volver a Reportes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Page-header end */}
                                {/* Page-body start */}
                                <div className="page-body">
                                    <div className="card product-add-modal">
                                        <div className="card-header">
                                            <h5>Reporte Atlas por Resultados</h5>

                                        </div>
                                        <div className="card-block">
                                            <div className="table-content crm-table">
                                                <div className="project-table">
                                                    <table id="report" className="table table-striped ">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ border: '1px solid', width: '200px' }}>Actividades</th>
                                                                <th style={{ border: '1px solid' }}>Descripcion de la actividad</th>
                                                                <th style={{ border: '1px solid' }}>Descripcion</th>
                                                                <th style={{ border: '1px solid' }}>Atlas</th>
                                                                <th style={{ border: '1px solid' }}>Q1</th>
                                                                <th style={{ border: '1px solid' }}>Ejec.</th>
                                                                <th style={{ border: '1px solid' }}>Q2</th>
                                                                <th style={{ border: '1px solid' }}>Ejec.</th>
                                                                <th style={{ border: '1px solid' }}>Q3</th>
                                                                <th style={{ border: '1px solid' }}>Ejec.</th>
                                                                <th style={{ border: '1px solid' }}>Balance</th>
                                                                <th style={{ border: '1px solid' }}>Planificacion</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="3" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    Resultado 1: Fortalecimiento del marco de gobernabilidad nacional y local para el corredor biológico árido-húmedo, con énfasis en áreas protegidas (APs) y sistemas productivos, y que contribuye a la conservación de la biodiversidad y a su uso sostenible
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>


                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="3" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    Producto 1.11 – Plataforma nacional y regional del café y cacao establecidas para la gobernanza y ordenamiento en toda la cadena de valor, consideran indicadores de productividad, sostenibilidad ambiental y resolución de conflictos sociales
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>1.11.1 Analizar necesidades de fortalecimiento de la capacidad de las organizaciones de productores de café y cacao</td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>i) Establecer plataformas nacionales y regionales para el café y el cacao para mejorar la gobernanza y la capacidad de manejo en toda la cadena de valor, incluyendo: a) análisis de las necesidades de fortalecimiento de la capacidad relacionada con la sostenibilidad ambiental de las organizaciones de productores de café y cacao;</td>

                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0, whiteSpace: 'normal' }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', whiteSpace: 'normal', padding: 15 }}>Personal para seguimiento de actividades a implementar</div>
                                                                        <div style={{ border: '1px solid', whiteSpace: 'normal', padding: 15 }}>Viaticos personal de apoyo y miembros de mesas para asistir.</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0, whiteSpace: 'normal' }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71600</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>

                                                            </tr>

                                                            <tr>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>1.11.2 Diseñar e implementar un plan para fortalecer las organizaciones de productores de café y cacao</td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>i)Establecer plataformas nacionales y regionales para el café y el cacao para mejorar la gobernanza y la capacidad de manejo en toda la cadena de valor, incluyendo: b) diseñar y ejecutar un plan para fortalecer las organizaciones de productores de café y cacao; </td>

                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0, height: "100%" }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>Personal para seguimiento de actividades a implementar</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>Depresiacion y  Combustible para equipo tecnico de unidad ejecutora</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>73400</div>
                                                                    </div>

                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>

                                                            </tr>

                                                            <tr>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>1.11.3 Establecer cooperación y fortalecer los acuerdos con las organizaciones de productores de café y cacao</td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>i)Establecer plataformas nacionales y regionales para el café y el cacao para mejorar la gobernanza y la capacidad de manejo en toda la cadena de valor, incluyendo: c) establecer acuerdos de cooperación y fortalecimiento con las organizaciones de productores de café y cacao. </td>

                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0, height: "100%" }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>Depresiacion y  Combustible para equipo tecnico de unidad ejecutora</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>Mobiliario para unidad ejecutora y personal de apoyo a las mesas tecnologicas</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>73400</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72800</div>
                                                                    </div>

                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>

                                                            </tr>

                                                            {/**RESULTADO 2 */}
                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="3" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    Resultado 2: Generación de beneficios ambientales, sociales y económicos a través del manejo sostenible de la tierra y la rehabilitación de corredores para aumentar la conectividad entre las APs y paisajes de producción
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>

                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="3" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    Producto 2.1 – HMP conectan sistemas de producción con APs (microcorredores biológicos, enriquecimiento de bosques, cercas vivas, barreras de viento, y manejo de la leña)
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.1.1 Identificar actores interesados en implementar HMP
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>a) Experto en MFS para la identificación de actores interesados en implementar HMP, incluidas mujeres, y la caracterización de las fincas participantes potenciales.</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>d) Gastos de viaje relacionados con la identificación de actores interesados en implementar HMP, incluidas mujeres, y caracterización de las fincas participantes potenciales. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>a) Talleres y reuniones relacionados con la identificación de actores interesados en implementar HMP, incluidas mujeres, y caracterización de las fincas participantes potenciales.    </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal para seguimiento de actividades a implementar</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Eventos de capacitacion: alimentacion y otros gastos</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.1.2 Identificar conjuntamente con los agricultores las HMP que se implementarán en cada finca
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>b) Experto en MFS identificar conjuntamente con los agricultores las HMP que se implementarán en cada finca.</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>e) Gastos de viaje relacionados con identificar conjuntamente con los agricultores las HMP que se implementarán en cada finca.</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>b) Talleres y reuniones con identificar conjuntamente con los agricultores las HMP que se implementarán en cada finca de acuerdo con los planes previstos. </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal para seguimiento de actividades a implementar</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Viaticos del personal de la unidad para realizar actividades</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Eventos de capacitacion: alimentacion y otros gastos</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71600</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>2.1.2 Implementar las HMP de acuerdo a los planes de trabajo definidos </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>a) Implementación de las HMP siguiendo los planes de trabajo previamente definidos para este propósito. </td>

                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0, height: "100%" }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>Personal para seguimiento de actividades a implementar</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>Alimentacion y gastos de capacitacion</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                    </div>

                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>

                                                            </tr>

                                                            <tr>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>2.1.3 Dar soporte técnico y seguimiento a la implementación de las  HMP</td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>

                                                                    <div style={{ padding: 15 }}>
                                                                        c) Experto en MFS para proporcionar soporte técnico y seguimiento a la implementación de las HMP.
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0, height: "100%" }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>Mobiliario y equipo para personal de seguimiento de la actividad</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>Alimentacion y gastos de capacitacion</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72800</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>

                                                            </tr>

                                                            <tr>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>2.1.3 Dar soporte técnico y seguimiento a la implementación de las  HMP</td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>

                                                                    <div style={{ padding: 15 }}>
                                                                        f) Gastos de viaje relacionados con el soporte técnico y el seguimiento de la implementación de las HMP.
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0, height: "100%" }}>
                                                                    <div>
                                                                        <div style={{ padding: 15 }}>capacitaciones grupales con productores</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ padding: 15 }}>75700</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>

                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="3" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    Producto 2.2 – Programa de certificación de fincas con fines de conservación y aprovechamiento (ICF, Rainforest Alliance, IHCAFE, etc.) en las áreas seleccionadas, específicamente con certificaciones vigentes en Honduras
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>2.2.1. Identificar plataformas organizacionales e informarles sobre el programa de certificación </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 15 }}>b) Implementación de un programa de certificación de conservación y uso sostenible para fincas.</td>
                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0, height: "100%" }}>
                                                                    <div>
                                                                        <div style={{ padding: 15 }}>Personal Experto</div>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ padding: 15 }}>71300</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>

                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.2.2. Identificar fincas con potencial para ser certificadas
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>

                                                                    <div style={{ whiteSpace: 'normal' }}>b) Implementación de un programa de certificación de conservación y uso sostenible para fincas. </div>

                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>

                                                                    <div style={{ border: '1px solid', padding: 15 }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</div>

                                                                    <div style={{ border: '1px solid', padding: 15 }}>Mobiliario y equipo para personal de seguimiento de la actividad</div>

                                                                    <div style={{ border: '1px solid', padding: 15 }}>Alimentacion y gastos de capacitacion</div>

                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72800</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.2.3. Identificar mercados para agricultores certificados
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>

                                                                    <div style={{ whiteSpace: 'normal' }}>b) Implementación de un programa de certificación de conservación y uso sostenible para fincas.</div>

                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>

                                                                    <div style={{ border: '1px solid', padding: 15 }}>Personal para seguimiento de actividades a implementar</div>

                                                                    <div style={{ border: '1px solid', padding: 15 }}>Capacitaciones al personal tecnico</div>

                                                                    <div style={{ border: '1px solid', padding: 15 }}>Viáticos</div>

                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71600</div>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>2.2.4. Certificar fincas y monitoreo</td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 15 }}>b) Implementación de un programa de certificación de conservación y uso sostenible para fincas. </td>
                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0, height: "100%" }}>
                                                                    <div>
                                                                        <div style={{ padding: 15 }}>Personal Experto</div>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ padding: 15 }}>71300</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>

                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="3" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    Producto 2.3 – 3.000 acuerdos firmados de conservación y buenas prácticas sociales con los productores de café, cacao y productos agroforestales, para adoptar HMP para la conservación y manejo sostenible de bosque
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.3.1 Crear conciencia sobre la importancia de las HMP para la conectividad ecosistémica
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>d) Experto en MFS para crear mayor conciencia entre los agricultores a través de visitas de campo y reuniones informativas sobre la importancia de las HMP y su contribución para construir la conectividad de los ecosistemas y para la producción sostenible. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>g) Gastos de viaje relacionados con la sensibilización de los agricultores a través de visitas de campo y reuniones informativas sobre la importancia de las HMP y su contribución para construir la conectividad de los ecosistemas y para la producción sostenible. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>(Viáticos)</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>c) Talleres y reuniones con la sensibilización de los agricultores a través de visitas de campo y reuniones informativas sobre la importancia de las HMP y su contribución para construir la conectividad de los ecosistemas y para la producción sostenible.</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal para seguimiento de actividades a implementar</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Viáticos</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Alimentacion y gastos de capacitacion</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71600</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.3.2 Negociar y firmar acuerdos voluntarios y desarrollar planes de acción
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>e) Experto en MFS para apoyar la firma de acuerdos y definir planes de trabajo para la implementación de las HMP. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>h) Gastos de viaje para apoyar la firma de acuerdos y definir planes de trabajo para la implementación de las HMP. </td>
                                                                        </tr>

                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Viaticos del personal de la unidad para realizar actividades</td>
                                                                        </tr>

                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71600</div>

                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.3.2 Negociar y firmar acuerdos voluntarios y desarrollar planes de acción
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>

                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>d) Talleres y reuniones para apoyar la firma de acuerdos y definir planes de trabajo para la implementación de las HMP. </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>

                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Transporte de lideres a modulos</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Alimentacion y gastos de capacitacion</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>

                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="3" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    Producto 2.4 – 4. Al menos 10 viveros comunitarios, familiares y públicos (instituciones estatales como ICF) que proveen más de 100.000 plántulas anuales para ser utilizadas con las herramientas de manejo del paisaje y para las prácticas de rehabilitación, incluyendo el manejo de la leña y para la restauración de ecosistemas para recarga hídrica
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.4.2. Determinar las especies nativas y las semillas que se cultivarán en los viveros
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>f) Experto en MFS para la evaluación de los viveros existentes en el paisaje priorizado incluyendo el número, ubicación, capacidad de producción, y la identificación de los interesados en operarlos (comunidad, familias, y / u organizaciones pública). </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>i) Gastos de viaje relacionados con la evaluación de los viveros existentes en el paisaje priorizado y determinar la ubicación, la capacidad de producción, y la identificación de los interesados que operarlos. </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal para seguimiento de actividades a implementar</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Viaticos del personal de la unidad para realizar actividades</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71600</div>

                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.4.3. Construcción de viveros para la producción de germoplasma nativo para la implementación de las HMP y restauración de ecosistemas
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>g) Experto en MFS para determinar las especies nativas y las semillas que se cultivarán en viveros para la implementación de las HMP y la restauración del ecosistema. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>j) Gastos de viaje para determinar las especies nativas y semillas que se cultivarán en viveros para la implementación de las HMP y reforestación y rehabilitación de ecosistemas.  </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>c) Construcción de viveros para la producción de germoplasma nativo para implementar las HMP y la restauración de ecosistemas para recarga de agua. </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Alimentacion y gastos de capacitacion</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>

                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>


                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="3" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    Producto 2.5 – Programa de captura de carbono para la venta de créditos en mercados nacionales
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.5.1. Diseñar un programa de compensación de carbón
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>h) Experto en carbón para diseñar un programa de compensación de carbono. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>k) Gastos de viaje relacionados con el diseño de un programa de compensación de carbón. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>e) Talleres y reuniones para sensibilizar a pequeños productores y productores sobre la compensación del programa de captura de carbón. </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Depresiacion y  Combustible para equipo tecnico de unidad ejecutora</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Alimentacion y gastos de capacitacion</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>73400</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>

                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.5.2. Análisis territorial para una iniciativa de captura de carbón
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>i) Experto en carbón para el análisis territorial de una iniciativa de captura de carbón. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>l) Gastos de viaje relacionados con el análisis territorial para una iniciativa de captura de carbón. </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>personal experto</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Matricula de vehiculos, motocicletas y seguros</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>74500</div>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.5.3. Certificación y verificación de remociones y reservas de carbono
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>e) Certificación y verificación de remociones de carbón y reservas. </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal para seguimiento de actividades a implementar</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    2.5.4 Promover créditos de carbono generados por el programa de captura de carbono
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>j) Experto en Mercado de Carbón para promover créditos de carbón generados por el programa de certificación y verificación de captura de carbón. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>m) Gastos de viaje relacionados con la promoción de mercados para créditos de carbón generados por el programa de certificación y verificación de captura de carbón. </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>personal experto</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>


                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="3" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    Resultado 3:  Establecimiento de iniciativas de cadenas productivas para aumentar los ingresos de agricultores derivados de sistemas de café y cacao  agroforestales sostenibles y los servicios ecosistemicos
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="3" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    Producto 3.1 – Programa de capacitación y asistencia técnica para 4.000 pequeños y medianos productores vinculado con escuelas de campo implementando mejores prácticas sostenibles, acceso a material genético certificado, planes de finca bajo sistemas agroforestales, certificaciones ambientales que impacten en la productividad y buenas prácticas  que favorezcan la biodiversidad y la conectividad de las AP
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>


                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    3.1.1 Identificar familias beneficiarias de entrenamiento y asistencia técnica
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>a) Experto en MFS para la identificación de familias (pequeños y medianos productores) para capacitación y asistencia técnica (mejores prácticas sostenibles, acceso a material genético certificado, planes agroforestales sostenibles para granjas, certificaciones ambientales). </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>b) Gastos de viaje para la identificación de familias (pequeños y medianos productores) para capacitación y asistencia técnica (mejores prácticas sostenibles, acceso a material genético certificado, planes agroforestales sostenibles para granjas, certificaciones ambientales). </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>viaticos</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>a) Talleres y reuniones para la identificación de familias (pequeños y medianos productores) para capacitación y asistencia técnica (mejores prácticas sostenibles, acceso a material genético certificado, planes agroforestales sostenibles para granjas, certificaciones ambientales). </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal para seguimiento de actividades a implementar</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Comunicacion para monitoreo de actividades de productores en la zona</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Viaticos</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Materiales y Suministros deHMP, Viveros , investigaciones y otros</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72400</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71600</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72300</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    3.1.2. Diseñar un paquete de asistencia técnica para cada cadena de valor con un enfoque de género
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>b) Experto en MFS para diseñar el paquete de asistencia técnica para cada cadena de valor con un enfoque de género. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>d) Gastos de viaje para facilitar el acceso a servicios financieros por parte de las familias productoras en cada cadena de valor. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>b) Talleres y reuniones de consulta para diseñar el paquete de asistencia técnica para cada cadena de valor con un enfoque de género.  </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal Experto</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal para seguimiento de actividades a implementar</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Alimentacion, hospedaje, transporte y salones</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    3.1.5 Firmar acuerdos de desempeño ambiental para el manejo de fincas con pequeños y medianos productores
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>b) Firma de acuerdos de desempeño ambiental para el manejo de fincas con pequeños y medianos productores. </td>
                                                                        </tr>

                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal para seguimiento de actividades a implementar</td>
                                                                        </tr>

                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>

                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    3.1.6 Prestar servicios técnicos para las diferentes etapas de cultivo o cadena de suministro
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>c) Servicios técnicos para las diferentes etapas de cultivo o cadena de suministro (estudios de suelos, manejo de plagas y enfermedades, genética, nutrición, innovación tecnológica asociada a mercados, etc.).</td>
                                                                        </tr>

                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal para seguimiento de actividades a implementar</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Mobiliario y equipo para personal de seguimiento de la actividad</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Matricula de Vehiculo motocicletas y seguros</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Comunicacion para monitoreo de actividades de productores en la zona</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Depresiacion y  Combustible para equipo tecnico de unidad ejecutora</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Alimentacion, hospedaje, transporte y salones</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Papeleria y Utiles</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Matricula de vehiculos, motocicletas y seguros</td>
                                                                        </tr>

                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72800</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>74500</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72400</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>73400</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>72500</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>74500</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                            <tr style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    3.1.8. Evaluar las mejores prácticas en sistemas agroforestales, incluidas las necesidades de investigación y establecer asociaciones
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>e) Experto Agroforestal para evaluar las mejores prácticas en sistemas agroforestales, incluidas las necesidades de investigación y el establecimiento de asociaciones. </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>e) Talleres y reuniones para evaluar las mejores prácticas en sistemas agroforestales, incluidas las necesidades de investigación y el establecimiento de asociaciones. </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}>
                                                                    <table>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Personal para seguimiento de actividades a implementar</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: '1px solid', whiteSpace: 'normal' }}>Alimentacion , Hospedaje, transporte y salones</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal', padding: 0 }}>
                                                                    <div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>71300</div>
                                                                        <div style={{ border: '1px solid', padding: 15 }}>75700</div>
                                                                    </div>
                                                                </td>

                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                                <td colSpan="1" style={{ border: '1px solid', whiteSpace: 'normal' }}></td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Container-fluid ends */}
                                </div>
                                {/* Page-body end */}
                            </div>
                        </div>
                        {/* Warning Section Starts */}
                        <div id="styleSelector">
                        </div>
                    </div>
                </div>

            </div >

        )
    }
}


class TabladeProductos extends Component {

    constructor() {
        super()
        this.state = {
            ArrayProducts: []
        };
    }

    async componentDidMount() {

        const { handleSetProducts } = this.props

        const res = await axios.get(
            "http://190.92.73.69:4000/api/atlas/productos/" + this.props.code_resultado
        )
        handleSetProducts(res.data.productos_atlas)
        this.setState({ ArrayProducts: res.data.productos_atlas })
        //this.setState({ ArrayResults: res.data.atlas_resultados })
    }


    /*fetch('http://190.92.73.69:4000/api/atlas/productos/' + this.props.code_resultado, { signal: this.abortController.signal })
            .then((response) => {
        return response.json()
    })
    .then((recurso) => {

        handleSetProducts(recurso.productos_atlas)
        this.setState({ ArrayProducts: recurso.productos_atlas })
    })
    }*/

    render() {

        return (
            <table className="table table-striped " >
                <tbody>

                    {/*this.state.ArrayProducts.map((Product) => (
                        <tr >
                            <td style={{ border: '1px solid' }}>
                                {Product.code} -{Product.name}
                            </td>
                        </tr>
                    ))
                    */}

                </tbody>
            </table>
        )
    }
}

class TabladeActividades extends Component {

    constructor() {
        super();
        this.state = {
            activities: []
        };
    }

    componentDidMount() {

        fetch('http://190.92.73.69:4000/api/atlas/productos/' + this.props.code_producto)
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                this.setState({ activities: recurso.productos_atlas })
            })
    }

    render() {
        debugger
        return (
            <table className="table table-striped " >
                <tbody>

                    {
                        this.state.activities.map((Activity) => (
                            <tr >
                                <td
                                    style={{ border: '1px solid' }}>
                                    {Activity.code} -{Activity.name}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

function exportTableToExcel(tableID, filename = '') {

    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}

