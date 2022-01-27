import React, { Component } from 'react';
import axios from 'axios';
import ChartistGraph from 'react-chartist';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            projects_atlas: [],
            budgets_atlas: [],
            project: [],
            ArrayGraficabyProject: [],
            budgetstart: 0.0,
        };
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        /*if (!localStorage.usertoken) {
                window.location.href = "/"
            }*/

        try {
            //obtenemos los presupuestos con categoria atlas
            const res_budgetsAtlas = await axios.get(
                'https://167.99.15.83:4000/api/budgets/atlas'
            );
            this.setState({ budgets_atlas: res_budgetsAtlas.data.budgets });

            /*const res = await axios.get("https://167.99.15.83:4000/api/projects/");
            this.setState({ projects: res.data.projects });
    
            const res1 = await axios.get("https://167.99.15.83:4000/api/projects/13");
            this.setState({ budgetstart: res1.data.data.budgetstart });
    
            const res2 = await axios.get("https://167.99.15.83:4000/api/budgetlines/atlas/grafica_atlas_by_project/13");
            this.setState({ ArrayGraficabyProject: res2.data.ArrayGraficabyProject });*/
        } catch (error) {
            console.log('ERROR IN CATCH', error);
        }
    }

    onChangeSelectBudget_Atlas = async(e) => {
        this.setState({ budget_id: e.target.value });

        const res_p = await axios.post(
            'https://167.99.15.83:4000/api/projects/findProjectsByBudgetId/' +
            e.target.value
        );
        this.setState({ projects_atlas: res_p.data.projectsbybudgetid });
    };

    onChangeSelectProject_Atlas = async(e) => {
        const projectid = e.target.value;

        const res_projectById = await axios.get(
            'https://167.99.15.83:4000/api/projects/' + projectid
        );
        this.setState({ project: res_projectById.data.data });
        this.setState({ budgetstart: res_projectById.data.data.budgetstart });

        const res2 = await axios.get(
            'https://167.99.15.83:4000/api/budgetlines/atlas/grafica_atlas_by_project/' +
            projectid
        );
        this.setState({ ArrayGraficabyProject: res2.data.ArrayGraficabyProject });

        console.log(res2);
        /* console.log(this.state.project)
             console.log(this.state.budgetstart)*/
    };

    render() {
        let semanas = [];
        let gastos = [];
        let sumadegastos = 0;
        let totaldisponible = this.state.budgetstart;
        let presupuestoInicial = this.state.budgetstart;
        let disponibles = [];

        gastos[0] = 0;
        disponibles[0] = this.state.budgetstart;

        const ArrayGraficas = this.state.ArrayGraficabyProject;

        for (let index = 0; index < ArrayGraficas.length; index++) {
            semanas[index] = ArrayGraficas[index].week;

            sumadegastos += ArrayGraficas[index].balance;
            gastos[index] = sumadegastos;

            totaldisponible -= ArrayGraficas[index].balance;
            disponibles[index] = totaldisponible;
        }

        console.log('Inicial=' + presupuestoInicial);
        console.log('Gastos=' + sumadegastos);
        console.log('Disponible=' + totaldisponible);

        var lineChartDataGastos = {
            labels: semanas,
            series: [gastos],
        };

        var lineChartDataDispoinble = {
            labels: semanas,
            series: [
                [],
                [],
                [],
                [],
                [], disponibles
            ],
        };

        var lineChartDataCombinado = {
            labels: semanas,
            series: [gastos, [],
                [],
                [],
                [], disponibles
            ],
        };

        var lineChartOptions = {
            showArea: true,
            height: '300px',
            width: '100%',
            low: 0,
            high: this.state.budgetstart,
            divisor: 12,
            x: 15,
        };

        var PieChartOptions = {
            height: '300px',
            width: '100%',
            /*donut: true
                  total: this.state.budgetstart,*/
            labelInterpolationFnc: function(value) {
                return Math.round((value / presupuestoInicial) * 100) + '%';
            },
        };

        var lineChartDataPie = {
            /**ejecutado,soliciado, , disponible */
            series: [, sumadegastos, , , , totaldisponible],
        };

        return ( <
            div >
            <
            div className = "pcoded-content" >
            <
            div className = "pcoded-inner-content" > { /* Main-body start */ } <
            div className = "main-body" >
            <
            div className = "page-wrapper" > { /* Page header start */ } <
            div className = "page-header page-wrapper" >
            <
            div className = "page-header-title" >
            <
            h4 > Panel de Presupuestos < /h4> <
            /div> <
            /div> { /* Page header start */ } { /* Page body start */ } <
            div className = "page-body" >
            <
            div className = "row"
            style = {
                { paddingBottom: '10px' } } >
            <
            div className = "col-sm-4" >
            <
            select onChange = { this.onChangeSelectBudget_Atlas }
            className = "form-control mb-4"
            name = "presupuesto" >
            <
            option value = "0" > Seleccione Presupuesto < /option> {
                this.state.budgets_atlas.map((budget) => ( <
                    option key = { budget.id }
                    value = { budget.id } > { budget.name } { ' ' } <
                    /option>
                ))
            } <
            /select> <
            /div> <
            div className = "col-sm-4" >
            <
            select onChange = { this.onChangeSelectProject_Atlas }
            className = "form-control mb-4"
            name = "proyecto" >
            <
            option value = "0" > Seleccione Proyecto < /option> {
                this.state.projects_atlas.map((project) => ( <
                    option key = { project.id }
                    value = { project.id } > { project.name } { ' ' } <
                    /option>
                ))
            } <
            /select> <
            /div> <
            /div>

            <
            div className = "row" >
            <
            div className = "col-sm-6" > { /* /* Product list card start */ } <
            div className = "card product-add-modal" >
            <
            div className = "card-header" >
            <
            h5 > { this.state.project.name } < /h5> <
            p >
            Areas de Gastos y Presupuesto disponible Combinadas <
            /p> <
            /div> <
            div className = "card-block" >
            <
            div className = "table-responsive" >
            <
            div className = "table-content" >
            <
            div className = "dt-responsive table-responsive" >
            <
            ChartistGraph data = { lineChartDataCombinado }
            options = { lineChartOptions }
            type = { 'Line' }
            /> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> <
            div className = "col-sm-6" > { /* /* Product list card start */ } <
            div className = "card product-add-modal" >
            <
            div className = "card-header" >
            <
            h5 > { this.state.project.name } < /h5> <
            p >
            Porcentajes Ejecutados, Solicitados y Disponibles <
            /p> <
            /div> <
            div className = "card-block" >
            <
            div className = "table-responsive" >
            <
            div className = "table-content" >
            <
            div className = "dt-responsive table-responsive" >
            <
            ChartistGraph data = { lineChartDataPie }
            options = { PieChartOptions }
            type = { 'Pie' }
            /> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> { /* Product list card end */ } <
            /div> <
            div className = "col-sm-6" > { /* /* Product list card start */ } <
            div className = "card product-add-modal" >
            <
            div className = "card-header" >
            <
            h5 > { this.state.project.name } < /h5> <
            p > Avances de gastos efectuados < /p> <
            /div> <
            div className = "card-block" >
            <
            div className = "table-responsive" >
            <
            div className = "table-content" >
            <
            div className = "dt-responsive table-responsive" >
            <
            ChartistGraph data = { lineChartDataGastos }
            options = { lineChartOptions }
            type = { 'Line' }
            /> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> { /* Product list card end */ } <
            /div> <
            div className = "col-sm-6" > { /* /* Product list card start */ } <
            div className = "card product-add-modal" >
            <
            div className = "card-header" >
            <
            h5 > { this.state.project.name } < /h5> <
            p > Presupuesto disponible < /p> <
            /div> <
            div className = "card-block" >
            <
            div className = "table-responsive" >
            <
            div className = "table-content" >
            <
            div className = "dt-responsive table-responsive" >
            <
            ChartistGraph data = { lineChartDataDispoinble }
            options = { lineChartOptions }
            type = { 'Line' }
            /> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> { /* Product list card end */ } <
            /div> <
            /div> <
            /div> { /* Page body end */ } <
            /div> <
            /div> { /* Main-body end */ } <
            div id = "styleSelector" > < /div> <
            /div> <
            /div> <
            /div>
        );
    }
}