import React, { Component } from 'react';
import axios from 'axios'
import ChartistGraph from 'react-chartist'

export default class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            projects: [],
            ArrayGraficabyProject: [],
            budgetstart: 0.0
        };

    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = "/"
        }

        const res = await axios.get("http://167.99.15.83:4000/api/projects/");
        this.setState({ projects: res.data.projects });

        const res1 = await axios.get("http://167.99.15.83:4000/api/projects/13");
        this.setState({ budgetstart: res1.data.data.budgetstart });

        const res2 = await axios.get("http://167.99.15.83:4000/api/budgetlines/atlas/grafica_atlas_by_project/13");
        this.setState({ ArrayGraficabyProject: res2.data.ArrayGraficabyProject });

    }

    render() {

        let semanas = []
        let gastos = []
        let sumadegastos = 0
        let totaldisponible = this.state.budgetstart
        let disponibles = []

        gastos[0] = 0
        disponibles[0] = this.state.budgetstart

        const ArrayGraficas = this.state.ArrayGraficabyProject

        for (let index = 1; index < ArrayGraficas.length; index++) {

            semanas[index] = ArrayGraficas[index - 1].week

            sumadegastos += ArrayGraficas[index - 1].balance
            gastos[index] = sumadegastos

            totaldisponible -= ArrayGraficas[index - 1].balance
            disponibles[index] = totaldisponible
        }

        var lineChartDataGastos = {
            labels: semanas,
            series: [gastos]
        }

        var lineChartDataDispoinble = {
            labels: semanas,
            series: [[], [], [], [], [], disponibles]
        }

        var lineChartDataCombinado = {
            labels: semanas,
            series: [gastos, [], [], [], [], disponibles]
        }

        /*var lineChartData = {
            labels: ['3', '4', '5', '6', '7', '8', '9', '10', '11'],
            series: [
                [0, 20739.96, 240739.96, 461730.61, 832133.06,
                    851455.16, 1075414.21, 1278957.25, 2524494.78],
                [], [], [], [],
                [4894695.8,
                    4873955.84,
                    4653955.84,
                    4432965.16,
                    4062562.74,
                    4043240.64,
                    3819281.59,
                    3615738.55,
                    2370201.02
                ]
            ]
        }*/

        var lineChartOptions = {
            showArea: true,
            height: '300px',
            width: '100%',
            low: 0,
            high: this.state.budgetstart,
            divisor: 12,
            x: 15
        }

        var PieChartOptions = {

            height: '300px',
            width: '100%',
            /*donut: true
            total: this.state.budgetstart,*/
            labelInterpolationFnc: function (value) {
                return Math.round(value / 4894695.80 * 100) + '%';
            }
        }

        var lineChartDataPie = {

            series: [, 2527894, 1658020.13, , , 2366801.02 - 1658020.13]
        }

        return (
            <div>
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        {/* Main-body start */}
                        <div className="main-body">
                            <div className="page-wrapper">
                                {/* Page header start */}
                                <div className="page-header page-wrapper">
                                    <div className="page-header-title">
                                        <h4>Panel de Presupuestos</h4>
                                    </div>

                                </div>
                                {/* Page header start */}
                                {/* Page body start */}
                                <div className="page-body">
                                    <div className="row">
                                        <div className="col-sm-6">

                                            {/* /* Product list card start */}
                                            < div className="card product-add-modal">
                                                <div className="card-header">
                                                    <h5>PROYECTO CONECTA+ (Q1) PRIMER TRIMESTRE</h5>
                                                </div>
                                                <div className="card-block">
                                                    <div className="table-responsive">
                                                        <div className="table-content">
                                                            <div className="dt-responsive table-responsive">

                                                                <ChartistGraph data={lineChartDataCombinado} options={lineChartOptions} type={'Line'} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Product list card end */}

                                            {this.state.projects.map(project =>

                                                /* Product list card start */ {/* <div key={project.id} className="card product-add-modal">
                                                    <div className="card-header">
                                                        <h5>{project.name}</h5>
                                                    </div>
                                                    <div className="card-block">
                                                        <div className="table-responsive">
                                                            <div className="table-content">
                                                                <div className="dt-responsive table-responsive">

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                /* Product list card end */
                                            )}
                                        </div>
                                        <div className="col-sm-6">

                                            {/* /* Product list card start */}
                                            < div className="card product-add-modal">
                                                <div className="card-header">
                                                    <h5>PROYECTO CONECTA+ (Q1) PRIMER TRIMESTRE</h5>
                                                </div>
                                                <div className="card-block">
                                                    <div className="table-responsive">
                                                        <div className="table-content">
                                                            <div className="dt-responsive table-responsive">

                                                                <ChartistGraph data={lineChartDataPie} options={PieChartOptions} type={'Pie'} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Product list card end */}

                                        </div>
                                        <div className="col-sm-6">

                                            {/* /* Product list card start */}
                                            < div className="card product-add-modal">
                                                <div className="card-header">
                                                    <h5>PROYECTO CONECTA+ (Q1) PRIMER TRIMESTRE</h5>
                                                </div>
                                                <div className="card-block">
                                                    <div className="table-responsive">
                                                        <div className="table-content">
                                                            <div className="dt-responsive table-responsive">

                                                                <ChartistGraph data={lineChartDataGastos} options={lineChartOptions} type={'Line'} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Product list card end */}

                                        </div>
                                        <div className="col-sm-6">

                                            {/* /* Product list card start */}
                                            < div className="card product-add-modal">
                                                <div className="card-header">
                                                    <h5>PROYECTO CONECTA+ (Q1) PRIMER TRIMESTRE</h5>
                                                </div>
                                                <div className="card-block">
                                                    <div className="table-responsive">
                                                        <div className="table-content">
                                                            <div className="dt-responsive table-responsive">

                                                                <ChartistGraph data={lineChartDataDispoinble} options={lineChartOptions} type={'Line'} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Product list card end */}

                                        </div>
                                    </div>
                                </div>
                                {/* Page body end */}
                            </div>
                        </div>
                        {/* Main-body end */}
                        <div id="styleSelector">
                        </div>
                    </div>
                </div>

            </div >

        );
    }
}
