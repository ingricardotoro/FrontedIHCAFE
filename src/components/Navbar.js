import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom'

class Navbar extends Component {

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        window.location.href = "/"
        //this.props.history.push('/')
    }

    render() {

        const loginRegLink = (

            <div>
                <div className="navbar-logo" style={{ backgroundColor: '#fff' }}>
                    <Link to={'/'} >
                        <img style={{ height: 30 }} className="img-fluid" src="%PUBLIC_URL%/assets/images/ihcafe.png" alt="Theme-Logo" />
                    </Link>
                </div>

                <ul className="nav-right">

                    <li className="user-profile header-notification">
                        <a href="#!">
                            <img src="%PUBLIC_URL%/assets/images/user.png" alt="Usersa" />
                            <span>Usuario</span>
                            <i className="ti-angle-down" />
                        </a>
                        <ul className="show-notification profile-notification">
                            <li>
                                <Link to="/">
                                    <i className="ti-home" /> Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="login">
                                    <i className="ti-layout-sidebar-left" /> Ingresar
                                </Link>
                            </li>

                        </ul>

                    </li>
                </ul >
            </div>

        )

        const userLink = (
            <div>
                <div className="navbar-logo" style={{ backgroundColor: '#fff' }}>
                    <a className="mobile-menu" id="mobile-collapse" href="/">
                        <i className="ti-menu" />
                    </a>
                    {/*<a className="mobile-search morphsearch-search" href="/">
                        <i className="ti-search" />
                    </a>*/}
                    <a className="mobile-options" href="/">
                        <i className="ti-more" />
                    </a>


                    <Link to={'/'} >
                        <img style={{ height: 30, backgroundColor: '#fff' }} className="img-fluid" src="assets/images/ihcafe.png" alt="Theme-Logo" />
                    </Link>


                </div>
                <ul className="nav-left">
                    <li>
                        <div className="sidebar_toggle"><a href="/"><i className="ti-menu" /></a></div>
                    </li>

                    {/* <li>
                        <a href="#!" onClick={"javascript:toggleFullScreen()"}>
                            <i className="ti-fullscreen" />
                        </a>
                    </li> */}

                </ul>

                <ul className="nav-right">

                    <li className="user-profile header-notification">
                        <a href="#!">
                            <img src="assets/images/user.png" alt="Usersa" />
                            <span>Usuario</span>
                            <i className="ti-angle-down" />
                        </a>
                        <ul className="show-notification profile-notification">
                            <li>
                                <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                                    <i className="ti-layout-sidebar-left" /> Salir
                                </a>
                            </li>
                        </ul>

                    </li>
                </ul>
            </div>
        )

        return (
            <div>
                <nav className="navbar header-navbar pcoded-header" >
                    <div className="navbar-wrapper">

                        <div className="navbar-container container-fluid">
                            <div>
                                {localStorage.usertoken ? userLink : loginRegLink}
                            </div>
                        </div>
                    </div>
                </nav>
            </div >
        )
    }
}
export default withRouter(Navbar)