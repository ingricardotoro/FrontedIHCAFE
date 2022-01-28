import React, { Component } from 'react';
import axios from 'axios';

export default class ModalVerFiles extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
        };
    }

    async componentDidMount() {
        //verificacion de usuario logeado
        if (!localStorage.usertoken) {
            window.location.href = '/';
        }

        const res_files = await axios.post(
            'http://167.99.15.83:4000/api/files/filesbybudgetid/' +
            this.props.budget_id +
            '/' +
            this.props.budgetline
        );
        this.setState({ files: res_files.data.files });
    }
    onClickDelete = async(filename) => {
        await axios.post('http://167.99.15.83:4000/api/files/delete/' + filename);
        window.location.href =
            'http://167.99.15.83/project/' + this.props.idProject;
    };

    render() {
        if (this.state.files) {
            return ( <
                div >
                <
                div className = "modal fade"
                id = { 'ver_archivos_' + this.props.budgetline }
                tabIndex = "-1"
                role = "dialog" >
                <
                div className = "modal-dialog modal-lg"
                role = "document" >
                <
                div className = "modal-content" >
                <
                div className = "modal-header" >
                <
                h4 className = "modal-title" > { this.props.budgetlineName } < /h4> <
                button type = "button"
                className = "close"
                data - dismiss = "modal"
                aria - label = "Close" >
                <
                span aria - hidden = "true" > & times; < /span> <
                /button> <
                /div> <
                div className = "modal-body"
                align = "center" >
                <
                div className = "row card-block" >
                <
                div className = "col-md-12" >
                <
                p > { this.props.budgetlineDetails } < /p> <
                ul className = "list-view" > {
                    this.state.files.map((file) => ( <
                        li key = { file.id } >
                        <
                        div className = "card user-card" >
                        <
                        div className = "card-block" >
                        <
                        div className = "media" > {
                            file.filename.slice(-4) === '.pdf' ? ( <
                                a className = "media-left"
                                href = {
                                    'http://167.99.15.83:4000/' +
                                    file.filedir +
                                    file.filename
                                } >
                                <
                                i style = {
                                    { width: '200px', color: 'red' } }
                                className = "icofont icofont-file-pdf icofont-5x"
                                src = {
                                    'http://167.99.15.83:4000/' +
                                    file.filedir +
                                    file.filename
                                }
                                />
                                Archivo PDF <
                                /a>
                            ) : ( <
                                a className = "media-left"
                                href = {
                                    'http://167.99.15.83:4000/' +
                                    file.filedir +
                                    file.filename
                                } >
                                <
                                img style = {
                                    { width: '200px' } }
                                className = "img-thumbnail "
                                src = {
                                    'http://167.99.15.83:4000/' +
                                    file.filedir +
                                    file.filename
                                }
                                alt = { file.filename }
                                /> <
                                /a>
                            )
                        } <
                        div className = "media-body" >
                        <
                        div className = "col-xs-12" >
                        <
                        h6 className = "d-inline-block" > { file.description } { ' ' } <
                        /h6> <
                        /div> <
                        div className = "f-13 text-muted m-b-15" > { file.fase } <
                        /div> <
                        a href = {
                            'http://167.99.15.83:4000/' +
                            file.filedir +
                            file.filename
                        } >
                        DESCARGAR { ' ' } <
                        /a>

                        <
                        div className = "mt-3 red" >
                        <
                        button type = "button"
                        onClick = {
                            () =>
                            this.onClickDelete(file.filename)
                        }
                        className = "btn btn-sm btn-danger" >
                        Eliminar Archivo { ' ' } <
                        /button> <
                        /div> <
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
                /div> <
                div className = "modal-footer" >
                <
                button type = "button"
                className = "btn btn-default waves-effect "
                data - dismiss = "modal" >
                Cerrar <
                /button> <
                /div> <
                /div> <
                /div> <
                /div> <
                /div>
            );
        } else {
            return ( <
                div >
                <
                div className = "modal fade"
                id = { 'ver_archivos_' + this.props.budgetlineatlas }
                tabIndex = "-1"
                role = "dialog" >
                <
                div className = "modal-dialog modal-lg"
                role = "document" >
                <
                div className = "modal-content" >
                <
                div className = "modal-header" >
                <
                h4 className = "modal-title" > SIN ARCHIVOS INGRESADOS < /h4> <
                button type = "button"
                className = "close"
                data - dismiss = "modal"
                aria - label = "Close" >
                <
                span aria - hidden = "true" > & times; < /span> <
                /button> <
                /div> <
                div className = "modal-body"
                align = "center" > < /div> <
                div className = "modal-footer" >
                <
                button type = "button"
                className = "btn btn-default waves-effect "
                data - dismiss = "modal" >
                Cerrar <
                /button> <
                /div> <
                /div> <
                /div> <
                /div> <
                /div>
            );
        }
    }
}