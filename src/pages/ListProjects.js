import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class ListProjects extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
        };
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = '/';
        }

        const res = await axios.get('http://167.99.15.83:4000/api/projects/');
        this.setState({ projects: res.data.projects });
    }

    formatMoney(number) {
        return number.toLocaleString('en-US', {
            style: 'currency',
            currency: 'HNL',
        });
        //return number;
    }

    render() {
        return ( <
            div >
            <
            div className = "pcoded-content" >
            <
            div className = "pcoded-inner-content" > { /* Main-body start */ } <
            div className = "main-body" >
            <
            div className = "page-wrapper" > { /* Page header start */ } <
            div className = "page-header mt-5" >
            <
            div className = "page-header-title" >
            <
            h4 > Listado de Projectos < /h4> <
            span > Visualización de todos los projectos creados < /span> <
            /div> <
            div className = "page-header-breadcrumb" >
            <
            ul className = "breadcrumb-title" >
            <
            li className = "breadcrumb-item" >
            <
            a href = "index.html" >
            <
            i className = "icofont icofont-home" / >
            <
            /a> <
            /li> <
            li className = "breadcrumb-item" >
            <
            a href = "#!" > Proyectos < /a> <
            /li> <
            li className = "breadcrumb-item" >
            <
            a href = "#!" > Listar < /a> <
            /li> <
            /ul> <
            /div> <
            /div> { /* Page header end */ } { /* Page body start */ } <
            div className = "page-body" >
            <
            div className = "row" >
            <
            div className = "col-sm-12" > { /* List view card start */ } <
            div className = "card" >
            <
            div className = "card-header" >
            <
            h5 > Proyectos < /h5> <
            div >
            <
            Link to = { '/projects/new' }
            className = "btn btn-success waves-effect waves-light f-right d-inline-block md-trigger" >
            { ' ' } <
            i className = "icofont icofont-plus m-r-5" / > Crear Nuevo { ' ' } <
            /Link> <
            /div> <
            div className = "card-header-right" >
            <
            i className = "icofont icofont-rounded-down" / >
            <
            i className = "icofont icofont-refresh" / >
            <
            i className = "icofont icofont-close-circled" / >
            <
            /div> <
            /div> <
            div className = "row card-block" >
            <
            div className = "col-md-12" >
            <
            ul className = "list-view" > {
                this.state.projects.map((project) => ( <
                    li style = {
                        { paddingBottom: '10px' } } >
                    <
                    div className = "card user-card" >
                    <
                    div className = "card-block" >
                    <
                    div className = "media" >
                    <
                    a className = "media-left"
                    href = "/" >
                    <
                    img className = "media-object img-circle card-list-img"
                    src = "assets/images/avatar-1.png"
                    alt = "Generic placeholder" /
                    >
                    <
                    /a> <
                    div className = "media-body" >
                    <
                    div className = "col-xs-12" >
                    <
                    h6 className = "d-inline-block" > { project.name } { ' ' } <
                    /h6> <
                    label className = "label label-primary ml-3" >
                    Prioridad: { project.priority } <
                    /label> <
                    /div> <
                    div className = "f-13 text-muted m-b-15" >
                    Equipo #1

                                          </div>

                                          <p>{project.description} </p>

                                          <label className= "label label-primary ml-3" >
                    Fecha de Inicio: { project.startdate } <
                    /label> <
                    label className = "label label-danger ml-3" >
                    Prespuesto Ejecutado: { ' ' } { project.budgetstart } <
                    /label> { /* <label className="label label-info ml-3">{project.budget.description}</label>  */ } <
                    label className = "label label-success ml-3" >
                    Prespuesto Disponible: { ' ' } { project.budgetstart } <
                    /label> <
                    Link to = { '/project/edit/' + project.id }
                    className = "btn btn-warning btn-sm m-1" >
                    Editar <
                    /Link> { /* <button className="btn btn-danger btn-sm m-1">Eliminar</button> */ } <
                    /div> <
                    /div> <
                    /div> <
                    /div> <
                    /li>
                ))
            } <
            /ul> <
            /div> <
            /div> <
            /div> { /* List view card end */ } <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div>
        );
    }
}