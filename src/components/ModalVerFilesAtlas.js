import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//import 'react-toastify/scss/main.scss'
function ModalVerFilesAtlas(props) {
    const {
        budgetlineatlas,
        budget_id,
        idProject,
        budgetlineatlasName,
        budgetlineatlasDetails,
    } = props;

    const [files, setFiles] = useState([]);

    let history = useHistory();

    useEffect(() => {
        if (!localStorage.usertoken) {
            history.push('/');
            //window.location.href = "/"
        }

        getData();
    }, []);

    const getData = async() => {
        const res_files = await axios.post(
            'http://167.99.15.83:4000/api/files/filesbybudgetid_atlas/' +
            budget_id +
            '/' +
            budgetlineatlas
        );
        //console.log(res_files.data.files)
        setFiles(res_files.data.files);
    };

    const onClickDelete = async(filename) => {
        await axios
            .post('http://167.99.15.83:4000/api/files/delete_atlas/' + filename)
            .then((dataResult) => {
                //volvemos a traer los archivos
                getData();
                toast.error('Archivo Eliminado', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((err) => {
                toast.error('Error:' + err, { position: toast.POSITION.TOP_RIGHT });
            });
    };

    //console.log(files)
    if (files.length > 0) {
        return ( <
            div >
            <
            div class = "modal fade"
            id = { 'ver_archivos_' + budgetlineatlas }
            tabindex = "-1"
            role = "dialog" >
            <
            div class = "modal-dialog modal-lg"
            role = "document" >
            <
            div class = "modal-content" >
            <
            div class = "modal-header" >
            <
            h4 class = "modal-title" > { budgetlineatlasName } < /h4> <
            button type = "button"
            class = "close"
            data - dismiss = "modal"
            aria - label = "Close" >
            <
            span aria - hidden = "true" > & times; < /span> <
            /button> <
            /div> <
            div class = "modal-body"
            align = "center" >
            <
            div className = "row card-block" >
            <
            div className = "col-md-12" >
            <
            p > { budgetlineatlasDetails } < /p> <
            ul className = "list-view" > {
                files.map((file) => ( <
                    li >
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
                            }
                            download = { file.filename } >
                            <
                            i style = {
                                { width: '200px', color: 'red' } }
                            className = "icofont icofont-file-pdf icofont-5x"
                            src = {
                                'http://167.99.15.83:4000/' +
                                file.filedir +
                                file.filename
                            }
                            download = { file.filename }
                            />
                            Archivo PDF <
                            /a>
                        ) : ( <
                            a className = "media-left"
                            href = {
                                'http://167.99.15.83:4000/' +
                                file.filedir +
                                file.filename
                            }
                            download = { file.filename } >
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
                        onClickDelete(file.filename)
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
            div class = "modal-footer" >
            <
            button type = "button"
            class = "btn btn-default waves-effect "
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
            div class = "modal fade"
            id = { 'ver_archivos_' + budgetlineatlas }
            tabindex = "-1"
            role = "dialog" >
            <
            div class = "modal-dialog modal-lg"
            role = "document" >
            <
            div class = "modal-content" >
            <
            div class = "modal-header" >
            <
            h4 class = "modal-title" > SIN ARCHIVOS INGRESADOS < /h4> <
            button type = "button"
            class = "close"
            data - dismiss = "modal"
            aria - label = "Close" >
            <
            span aria - hidden = "true" > & times; < /span> <
            /button> <
            /div> <
            div class = "modal-body"
            align = "center" > < /div> <
            div class = "modal-footer" >
            <
            button type = "button"
            class = "btn btn-default waves-effect "
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

export default ModalVerFilesAtlas;