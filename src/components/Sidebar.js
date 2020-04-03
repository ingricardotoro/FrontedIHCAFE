import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Sidebar extends Component {
    render() {
        return (
            <div>
                <div className="pcoded-wrapper">
                    <nav className="pcoded-navbar">
                        <div className="sidebar_toggle"><a href="/"><i className="icon-close icons" /></a></div>
                        <div className="pcoded-inner-navbar main-menu pcoded-main-container">
                        <div className="pcoded-navigatio-lavel" data-i18n="nav.category.navigation">Menu</div>
                        <ul className="pcoded-item pcoded-left-item">

                            <li className="pcoded-hasmenu">
                                <Link to={'/budgets'} >
                                <span className="pcoded-micon"><i className="ti-blackboard" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Dashboard</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                            </li>

                            <li className="pcoded-hasmenu">
                                <Link to="/" >
                                <span className="pcoded-micon"><i className="ti-pencil-alt" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">ATLAS</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                <Link to="/atlas">
                                    <li className=" ">
                                        <a href="navbar-light.html">
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mcaret" />
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Gestión de Atlas</span>
                                        </a>
                                    </li> 
                                    </Link>
                                    <Link to="/atlas_accounts">
                                    <li className=" ">
                                        <a href="navbar-light.html">
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mcaret" />
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Cuentas Atlas</span>
                                        </a>
                                    </li> 
                                    </Link>
                                </ul>
                            </li>
                        
                            <li className="pcoded-hasmenu">
                                <Link to="/" >
                                <span className="pcoded-micon"><i className="ti-pencil-alt" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Presupuestos</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                <Link to="/budgets">
                                    <li className=" ">
                                        <a href="navbar-light.html">
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Ver Presupuestos</span>
                                        <span className="pcoded-mcaret" />
                                        </a>
                                    </li> 
                                    </Link>
                                    <Link to="/budgets/new">
                                    <li className=" ">
                                        <a href="navbar-light.html">
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Nuevo Presupuesto</span>
                                        <span className="pcoded-mcaret" />
                                        </a>
                                    </li> 
                                    </Link>
                                </ul>
                            </li>

                           

                           

                            <li className="pcoded-hasmenu">
                                <Link to="#">
                                <span className="pcoded-micon"><i className="ti-panel" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Proyectos</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                    <li className=" ">
                                        <Link to={'/projects'} href="navbar-light.html">
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Ver Proyectos</span>
                                        <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                    <li className=" ">
                                        <Link to={'/projects/new'} href="navbar-light.html">
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Nuevo Proyecto</span>
                                        <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                </ul>
                            </li>

                            <li className="pcoded-hasmenu">
                                <Link to="/">
                                <span className="pcoded-micon"><i className="ti-layers" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Categorias</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                    <li className=" ">
                                        <Link to={'/categories'} >
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Ver Categorias</span>
                                        <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                    <li className=" ">
                                        <Link to="/">
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Nueva Categoria</span>
                                        <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                </ul>
                            </li>

                            <li className="pcoded-hasmenu">
                                <Link to="/">
                                <span className="pcoded-micon"><i className="ti-bar-chart-alt" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Reportes</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                    <li className=" ">
                                        <Link to="/reports">
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Ver Reportes</span>
                                        <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                </ul>
                            </li>

                        </ul>

                        <div className="pcoded-navigatio-lavel" data-i18n="nav.category.navigation">Configuración de Monedas</div>
                        <ul className="pcoded-item pcoded-left-item">

                        <li className="pcoded-hasmenu">
                                <Link to="/">
                                <span className="pcoded-micon"><i className="ti-book" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Cuentas</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                    <li className=" ">
                                    <Link to={'/accounts'} >
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Ver Cuentas</span>
                                        <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                </ul>
                            </li>
                        
                        <li className="pcoded-hasmenu">
                                <Link to="/">
                                <span className="pcoded-micon"><i className="ti-money" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Monedas</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                    <li className=" ">
                                        <a href="navbar-light.html">
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Navbar</span>
                                        <span className="pcoded-mcaret" />
                                        </a>
                                    </li> 
                                </ul>
                            </li>
                            <li className="pcoded-hasmenu">
                                <Link to="/">
                                <span className="pcoded-micon"><i className="ti-reload" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Rembolsos</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                    <li className=" ">
                                        <a href="navbar-light.html">
                                        <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                        <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Ver Rembolsos</span>
                                        <span className="pcoded-mcaret" />
                                        </a>
                                    </li> 
                                </ul>
                            </li>

                    </ul>


                    <div className="pcoded-navigatio-lavel" data-i18n="nav.category.navigation">Personal</div>
                        <ul className="pcoded-item pcoded-left-item">

                        <li className="pcoded-hasmenu">
                                <Link to="/">
                                <span className="pcoded-micon"><i className="ti-sharethis" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Equipos</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                    <li className=" ">
                                        <Link to={'/teams_list'} >
                                            <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                            <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Ver Equipos</span>
                                            <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                    <li className=" ">
                                        <Link to={'/teams_list'} >
                                            <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                            <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Nuevo Equipo</span>
                                            <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                </ul>
                            </li>
                        
                        <li className="pcoded-hasmenu">
                                <Link to="/">
                                <span className="pcoded-micon"><i className="ti-server" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Proveedores</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                    <li className=" ">
                                        <Link to={'/suppliers_list'} >
                                            <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                            <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Ver Proveedores</span>
                                            <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                    <li className=" ">
                                        <Link to={'/suppliers_list'} >
                                            <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                            <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Nuevo Proveedore</span>
                                            <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                </ul>
                            </li>

                            <li className="pcoded-hasmenu">
                                <Link to="/">
                                <span className="pcoded-micon"><i className="ti-user" /></span>
                                <span className="pcoded-mtext" data-i18n="nav.navigate.main">Usarios</span>
                                <span className="pcoded-mcaret" />
                                </Link>
                                <ul className="pcoded-submenu">
                                    <li className=" ">
                                        <Link to={'/users_list'} >
                                            <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                            <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Ver Usuarios</span>
                                            <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                    <li className=" ">
                                        <Link to={'/suppliers_list'} >
                                            <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                                            <span className="pcoded-mtext" data-i18n="nav.navigate.navbar">Nuevo Usuario</span>
                                            <span className="pcoded-mcaret" />
                                        </Link>
                                    </li> 
                                </ul>
                            </li>

                    </ul>
                       
                    </div>
                    </nav>
                </div>
            </div>
        )
    }
}
