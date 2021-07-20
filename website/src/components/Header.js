import React from 'react'
import {accountLogout} from '../api/Api'
import {Link} from 'react-router-dom'

function Header(props) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary text-secondary shadow">
                <div className="container">
                    <Link to="" className="navbar-brand">{props.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex mx-auto">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav  mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="" className="nav-link" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="" className="nav-link" aria-current="page">Notification</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to="" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Profile
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to="" className="dropdown-item">Logout</Link></li>
                                    <li><Link to="" className="dropdown-item">Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link to="" className="dropdown-item">Something else here</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to="" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Settings
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to="" className="dropdown-item">Logout</Link></li>
                                    <li><Link to="" className="dropdown-item">Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link to="" className="dropdown-item">Something else here</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
