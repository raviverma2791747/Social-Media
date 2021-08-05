import React from 'react'
import { accountLogout, getActivities } from '../api/Api'
import { Link, useHistory } from 'react-router-dom'
import { FaCog, FaUser, FaBell, FaHome } from "react-icons/fa";
import '../components/css/Header.css';
import { userContext } from '../App'
import react from 'react';
import Spinner from './ui/Spinner';

function Header() {
    const user = React.useContext(userContext);
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [notificationData,setNotificationData] = React.useState({})
    const logout = () => {
        accountLogout().then((data) => {
            if (data["status"] == "success") {
                user.setAuthenticate(false);
            }
        })
    }

    const home = () => {
        history.push('/home');
    }

    const settings = () => {
        history.push('/settings');
    }

    React.useEffect(() => {
        if (user.authenticate && loading) {
            getActivities().then((data)=>{
                if(data['status']==='success'){
                    setNotificationData(data['data']);
                    setLoading(false);
                }
            })
        }

    }, [loading, user])

    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light bg-primary text-secondary shadow">
                <div className="container">
                    <Link to="" className="navbar-brand">Social Media</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <form className="d-flex mx-auto">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav  mb-2 mb-lg-0 text-center">
                            <li className="nav-item">
                                <button className="btn btn-lg btn-secondary" onClick={home}>
                                    <FaHome />
                                </button>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn btn-lg btn-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaBell />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    {
                                        loading ? <Spinner/> : notificationData.map((notification)=>{
                                            return (<Notification data={notification} />)
                                        })
                                    }
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn btn-lg btn-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaUser />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to={`/profile/${user.username}`} >Profile</Link></li>
                                    <li><Link className="dropdown-item" to="" onClick={logout} >Logout</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-lg btn-secondary" onClick={settings}>
                                    <FaCog />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}


function Notification({data}) {
    return (<li><Link className="dropdown-item" to={'post/' + data.post_id.toString()}>{data.username + ' ' + data.type.toLowerCase() + ' on '+ data.post_owner +'\'s post'} </Link></li>)
}

export default Header
