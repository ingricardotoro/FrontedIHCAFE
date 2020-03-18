import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Navbar extends Component {
    render() {
        return (
                <div>
                    <nav className="navbar header-navbar pcoded-header">
                        <div className="navbar-wrapper">
                        <div className="navbar-logo">
                            <a className="mobile-menu" id="mobile-collapse" href="#!">
                            <i className="ti-menu" />
                            </a>
                            <a className="mobile-search morphsearch-search" href="#">
                            <i className="ti-search" />
                            </a>
                            <a href="index.html">
                            <img className="img-fluid" src="assets/images/logo.png" alt="Theme-Logo" />
                            </a>
                            <a className="mobile-options">
                            <i className="ti-more" />
                            </a>
                        </div>
                        <div className="navbar-container container-fluid">
                            <div>
                            <ul className="nav-left">
                                <li>
                                <div className="sidebar_toggle"><a href="javascript:void(0)"><i className="ti-menu" /></a></div>
                                </li>
                                <li>
                                <a className="main-search morphsearch-search" href="#">
                                    {/* themify icon */}
                                    <i className="ti-search" />
                                </a>
                                </li>
                                <li>
                                <a href="#!" onclick="javascript:toggleFullScreen()">
                                    <i className="ti-fullscreen" />
                                </a>
                                </li>
                                
                            </ul>
                            <ul className="nav-right">
                              
                                <li className="user-profile header-notification">
                                    <a href="#!">
                                        <img src="assets/images/user.png" alt="User-Profile-Image" />
                                        <span>John Doe</span>
                                        <i className="ti-angle-down" />
                                    </a>
                                    <ul className="show-notification profile-notification">
                                        <li>
                                            <a href="#!">
                                                <i className="ti-settings" /> Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a href="user-profile.html">
                                                <i className="ti-user" /> Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="email-inbox.html">
                                                <i className="ti-email" /> My Messages
                                            </a>
                                        </li>
                                        <li>
                                            <a href="auth-lock-screen.html">
                                                <i className="ti-lock" /> Lock Screen
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="ti-layout-sidebar-left" /> Logout
                                            </a>
                                        </li>
                                    </ul>

                                </li>
                             </ul>
                         
                            </div>
                        </div>
                        </div>
                    </nav>
                </div>
        )
    }
}
