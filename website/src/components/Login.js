import '../components/css/Login.css'
import React, { useState } from 'react'
import { login, accountIsAuthenticated } from '../api/Api'
import {
    useHistory,
    Link,
    Redirect
} from "react-router-dom";



function Login(props) {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const submit = (e) => {
        e.preventDefault();
        let data = {
            username: username,
            password: password
        }
        login(data).then((data) => {
            if (data['status'] == 'success') {
                history.push('/home');
            }
        });
    }

    return (
        <div className="container-fluid vh-100">
            {
                authenticated ? (<Redirect to="/home"/>) :
               (<div className="row vh-100">
                    <div className="col-md bg-primary d-flex flex-column justify-content-center align-items-center">
                        <div>
                            <h1 className="fw-bold text-secondary"><Link className="brand" to="/"> Social Media </Link></h1>
                        </div>
                    </div>
                    <div className="col-md bg-secondary d-flex flex-column justify-content-center">
                        <div id="login-card" className="card shadow">
                            <div className="card-body p-5">
                                <h3 className="card-title text-center text-primary my-4">Login into social media</h3>
                                <form onSubmit={submit} >
                                    <div className="mb-3">
                                        <input value={username} className="form-control text-center is-valid" type="text" placeholder="Enter the username" onChange={onChangeUsername} />
                                    </div>
                                    <div className="mb-3">
                                        <input value={password} className="form-control text-center is-invalid" type="password" placeholder="Enter the password" onChange={onChangePassword} />
                                    </div>
                                    <div className="mb-3 text-center">
                                        <input className="btn btn-primary" type="submit" value="Login" />
                                    </div>
                                    <div className="mb-3 text-center">
                                        <Link className="form-text" to="/signup" >Sign up social media</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Login
