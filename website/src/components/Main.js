import React, { useState } from 'react'
import { accountIsAuthenticated } from '../api/Api'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
} from "react-router-dom";




function Main() {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();

    const login = () => {
        history.push('/login');
    };

    const signup = () => {
        history.push('/signup');
    }

    accountIsAuthenticated().then((data) => {
        if (data["status"] === "success") {
            console.log(data);
            setAuthenticated(true)
        }
    })

    return (
        <div className="container-fluid vh-100">
            {
                authenticated ? (<Redirect to="/home" />) :
                    (<div className="row vh-100">
                        <div className="col-md bg-primary d-flex flex-column justify-content-center align-items-center">
                            <div><h1 className="fw-bold text-secondary">Social Media</h1></div >
                            <div><h3 className="fw-bold text-secondary">Join Today</h3></div>
                        </div>
                        <div className="col-md bg-secondary d-flex flex-column justify-content-center">
                            <button className="btn btn-outline-primary btn-lg mx-5 mb-5" onClick={login}>Log In</button>
                            <button className="btn btn-primary btn-lg mx-5" onClick={signup}>Sign Up</button>
                        </div>
                    </div>)
            }
        </div>
    );
}
export default Main
