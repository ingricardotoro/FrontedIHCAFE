import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class BudgetLineEdit extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,

            budgetLine: {},
            budgetLinesCat: [],
            projects: [],

            //para el modal
            code: '',
            name: '',
            project_id: 0,
            category_id: 0,
            sub_category_code: '',
            user_id: 1,
            status: 'Solicitado',
            supplier_id: 1,
            date_start: '',
            date_end: '',
            account_id: 0,
            budgetstart: 0.0,
            budgeupdate: 0.0,
            budgetfinal: 0.0,
            balance: 0.0,

            categories: [],
            clasificaciones: [],
            cuentas: [],

            suppliers: [],
            supplier: 0,
            details: '',

            aprobar: 1,
            valor: -1.0,
            comentario: '',

            variable: 0,
            //variable que almacenara el budgetstart del proyecto actual
            bdg_start_project: 0.0,
        };
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = '/';
        }

        const res = await axios.post(
            'http://167.99.15.83:4000/api/budgetlines/findone/' +
            this.props.match.params.projectId +
            '/' +
            this.props.match.params.id
        );

        this.setState({ budgetLine: res.data.budgetLine });
        this.setState({ code: this.state.budgetLine.code });
        this.setState({ details: this.state.budgetLine.description });
        // name: this.state.name,
        //status: this.state.status,
        //project_id: this.props.idProject,
        //user_id: this.state.user_id,
        this.setState({ supplier_id: this.state.budgetLine.supplier });
        this.setState({ date_start: this.state.budgetLine.date_start });
        this.setState({ date_end: this.state.budgetLine.date_end });
        this.setState({ account_id: this.state.budgetLine.account_id });
        this.setState({ buddgetstart: this.state.budgetLine.budgetstart });
        this.setState({ buddgeupdate: this.state.budgetLine.budgeupdate });
        // this.setState({ buddgetfinal: this.state.budgetLine.budgetfinal })
        this.setState({ balance: this.state.budgetLine.balance });
        this.setState({ category_id: this.state.budgetLine.category_id });
        this.setState({
            sub_category_code: this.state.budgetLine.sub_category_code,
        });

        const res4 = await axios.get(
            'http://167.99.15.83:4000/api/categories/categories_parents/'
        );
        this.setState({ categories: res4.data.categories });

        const res6 = await axios.get('http://167.99.15.83:4000/api/accounts/');
        this.setState({ cuentas: res6.data.cuentas });

        const res_suppliers = await axios.get(
            'http://167.99.15.83:4000/api/suppliers/'
        );
        this.setState({ suppliers: res_suppliers.data.suppliers });

        this.setState({ project_id: this.props.idProject });
    }

    onChanceCategory = async(e) => {
        this.setState({ category_id: e.target.value });
        const res5 = await axios.get(
            'http://167.99.15.83:4000/api/categories/categories_childs/' +
            e.target.value
        );
        this.setState({ clasificaciones: res5.data.clasificaciones });
    };

    onChanceClasificacion = async(e) => {
        this.setState({ sub_category_code: e.target.value });
        const res7 = await axios.get(
            'http://167.99.15.83:4000/api/categories/child/' + e.target.value
        );
        this.setState({ name: res7.data.child.name });
    };

    onChangeStartDate = (e) => {
        this.setState({ date_start: e.target.value });
    };
    onChangeEndDate = (e) => {
        this.setState({ date_end: e.target.value });
    };
    onChanceBudget = (e) => {
        this.setState({ budgetstart: e.target.value });
        this.setState({ balance: e.target.value });
    };

    onchangeComentario = (e) => {
        this.setState({ comentario: e.target.value });
    };
    onchangeMonto = (e) => {
        this.setState({ valor: e.target.value });
    };

    onChanceSupplier = async(e) => {
        this.setState({ supplier: e.target.value });
    };

    onChanceDetails = async(e) => {
        this.setState({ details: e.target.value });
    };

    onChanceAccount = async(e) => {
        this.setState({ account_id: e.target.value });
    };

    onChanceCode = async(e) => {
        this.setState({ code: e.target.value });
    };

    formatMoney(number) {
        return number.toLocaleString('en-US', {
            style: 'currency',
            currency: 'HNL',
        });
        //return number;
    }

    onSubmitEdit = async(e) => {
        e.preventDefault();

        await axios.put(
            'http://167.99.15.83:4000/api/budgetlines/update/' +
            this.props.match.params.projectId +
            '/' +
            this.props.match.params.id, {
                code: this.state.code,
                description: this.state.details,
                supplier_id: this.state.supplier,
                date_start: this.state.date_start,
                date_end: this.state.date_end,
                account_id: this.state.account_id,
                balance: this.state.budgetstart,
                category_id: this.state.category_id,
                sub_category_code: this.state.sub_category_code,
            }
        );
        window.location.replace('');
        //window.location.href = "http://sipa.ihcafe.hn/project/" + this.props.match.params.projectId;
    };

    render() {
        return ( <
            div className = "pcoded-content" >
            <
            div className = "pcoded-inner-content" >
            <
            div className = "main-body" >
            <
            div className = "page-wrapper" >
            <
            div className = "page-header page-wrapper mt-3 " >
            <
            div className = "page-header-title" >
            <
            h4 > Editar Reglón presupuestario < /h4> <
            span > Edición del Gasto Presupuestal < /span> <
            /div> <
            div className = "page-header-breadcrumb" >
            <
            ul className = "breadcrumb-title" >
            <
            li className = "breadcrumb-item" >
            <
            a href = "index.html" >
            <
            i className = "icofont icofont-home" > < /i> <
            /a> <
            /li> <
            li className = "breadcrumb-item" >
            <
            Link to = { '/project/' + this.props.match.params.projectId } >
            Regresar <
            /Link> <
            /li> <
            /ul> <
            /div> <
            /div> <
            div className = "page-body" >
            <
            div className = "row" >
            <
            div className = "col-sm-12" >
            <
            div className = "card" >
            <
            div className = "card-header" >
            <
            h5 > Formulario de Edición < /h5> <
            span >
            Ingrese correctamente cada uno de los datos solicitados. <
            /span> <
            div className = "card-header-right" >
            <
            i className = "icofont icofont-rounded-down" > < /i> <
            i className = "icofont icofont-refresh" > < /i> <
            i className = "icofont icofont-close-circled" > < /i> <
            /div> <
            /div> <
            div className = "card-block" >
            <
            div >
            <
            p > < /p> <
            div className = "card-block" >
            <
            form onSubmit = { this.onSubmitEdit } >
            <
            div >
            <
            div >
            <
            div >
            <
            div className = "modal-header" >
            <
            h4 className = "modal-title" >
            Editar Presupuesto: { ' ' } { this.state.budgetLine.name } { ' ' } <
            /h4> <
            /div> <
            div className = "modal-body" > { /* <input name type="hidden" classname="form-control mt-3" defaultValue="{this.props.idProject}/" /> */ } <
            div className = " mt-3" >
            <
            div style = {
                {
                    width: '50%',
                    display: 'inline-block',
                }
            } >
            <
            select onChange = { this.onChanceCategory }
            name = "select"
            className = "form-control mt-3" >
            <
            option value = { this.state.category_id } >
            Seleccione Categoria <
            /option> {
                this.state.categories.map(
                    (category) => ( <
                        option key = { category.id }
                        value = { category.code } >
                        ({ category.code }) - { category.name } { ' ' } <
                        /option>
                    )
                )
            } <
            /select> <
            /div> <
            div style = {
                {
                    width: '50%',
                    display: 'inline-block',
                }
            } >
            <
            select onChange = {
                this.onChanceClasificacion
            }
            name = "select"
            className = "form-control mt-3" >
            <
            option value = {
                this.state.sub_category_code
            } >
            Seleccione Clasificación de Renglón <
            /option> {
                this.state.clasificaciones.map(
                    (clasificacion) => ( <
                        option value = { clasificacion.code } >
                        ({ clasificacion.code }) - { clasificacion.name } { ' ' } <
                        /option>
                    )
                )
            } <
            /select> <
            /div> <
            /div> <
            div className = " mt-3" >
            <
            div style = {
                {
                    width: '50%',
                    display: 'inline-block',
                }
            } >
            <
            select onChange = { this.onChanceAccount }
            name = "select_account_money"
            className = "form-control mt-3" >
            <
            option value = { this.state.account_id } >
            Seleccione Cuenta de Origen <
            /option> {
                this.state.cuentas.map(
                        (cuenta) => ( <
                            option key = { cuenta.id }
                            value = { cuenta.id } >
                            ({ cuenta.coin.name } - { cuenta.name } { ' ' } <
                                /option>
                            )
                        )
                    } <
                    /select> <
                    /div> <
                    div
                style = {
                        {
                            width: '50%',
                            display: 'inline-block',
                        }
                    } >
                    <
                    select
                onChange = { this.onChanceSupplier }
                name = "select_suppliers"
                className = "form-control mt-3" >
                    <
                    option
                value = { this.state.supplier_id } >
                    Seleccione Beneficiario / Proveedor <
                    /option> {
                        this.state.suppliers.map(
                            (supplier) => ( <
                                option key = { supplier.id }
                                value = { supplier.id } >
                                { supplier.contact_name } { ' ' } <
                                /option>
                            )
                        )
                    } <
                    /select> <
                    /div> <
                    /div>

                <
                div className = "input-group mt-3" >
                    <
                    textarea
                onChange = { this.onChanceDetails }
                value = { this.state.details }
                className = "form-control"
                name = "details"
                cols = "30"
                rows = "3" >
                    < /textarea> <
                    /div>

                <
                div
                style = {
                        {
                            width: '50%',
                            display: 'inline-block',
                        }
                    } >
                    <
                    input
                name = "buddgetstart"
                onChange = { this.onChanceBudget }
                type = "text"
                className = "form-control"
                value = { this.state.balance }
                placeholder = "Ingrese El valor Solicitado : 0,000.00 " /
                    >
                    <
                    /div> <
                    div
                style = {
                        {
                            width: '50%',
                            display: 'inline-block',
                        }
                    } >
                    <
                    input
                name = "code"
                onChange = { this.onChanceCode }
                type = "text"
                className = "form-control"
                value = { this.state.code }
                placeholder = "Ingrese Codigo de Identificación: 01-101-01 " /
                    >
                    <
                    /div> <
                    div className = "mt-3" >
                    <
                    div
                style = {
                        {
                            width: '50%',
                            display: 'inline-block',
                        }
                    } >
                    <
                    input
                onChange = { this.onChangeStartDate }
                className = "form-control mt-3"
                type = "date"
                placeholder = "Fecha de Inicio"
                value = { this.state.date_start }
                /> <
                label htmlFor = "" >
                    Fecha de Inicio <
                    /label> <
                    /div> <
                    div
                style = {
                        {
                            width: '50%',
                            display: 'inline-block',
                        }
                    } >
                    <
                    input
                onChange = { this.onChangeEndDate }
                className = "form-control mt-3"
                type = "date"
                placeholder = "Fecha de Final"
                value = { this.state.date_end }
                />

                <
                label htmlFor = "" >
                    Fecha de Finalización <
                    /label> <
                    /div> <
                    /div> <
                    div
                className = "mt-3"
                style = {
                        {
                            width: '100%',
                            textAlign: 'center',
                            display: 'inline-block',
                        }
                    } >
                    <
                    button
                type = "submit"
                className = "btn btn-success waves-effect " >
                    Editar Este Renglón Presupuestario <
                    /button> <
                    /div>

                <
                div className = "modal-footer" >
                    <
                    button
                type = "button"
                className = "btn btn-default waves-effect "
                data - dismiss = "modal" >
                    Cerrar <
                    /button> <
                    /div> <
                    /div> <
                    /div> <
                    /div> <
                    /div>

                { /*FIN Modal EDIT*/ } <
                /form> <
                /div> <
                /div> <
                p / >
                    <
                    /div> <
                    /div> <
                    /div> <
                    /div> <
                    /div> <
                    /div> <
                    /div> <
                    div id = "styleSelector" > < /div> <
                    /div> <
                    /div>
            );
        }
    }