import '../components/css/Login.css'
import React from 'react'
import Loading from '../components/Loading'
import { accountLogin, accountIsAuthenticated, profileCurrentUser } from '../api/Api'
import {
    useHistory,
    Link,
    Redirect
} from "react-router-dom";
import { userContext } from '../App';

function Login(props) {
    const user = React.useContext(userContext);
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [message, setMessage] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    React.useEffect(()=>{
        if(!user.authenticate){
            setLoading(false);
        }
    },[]);

    const submit = (e) => {
        e.preventDefault();
        let data = {
            username: username,
            password: password
        }
        accountLogin(data).then((data) => {
            if (data['status'] === 'success') {
                profileCurrentUser().then((data) => {
                    if (data['status'] === 'success') {
                        user.setUsername(data['data']['username']);
                    }
                });
                user.setAuthenticate(true);
            } else {
                setMessage(data['message']);
            }
        });
    }

    return (
        <React.Fragment>
            {
                user.authenticate ? (<Redirect to='/home' />) : (loading ? (<Loading />) :
                    (<div className="container-fluid vh-100">
                        <div className="row vh-100">
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
                                                <input value={username} className="form-control text-center" type="text" placeholder="Enter the username" onChange={onChangeUsername} />
                                            </div>
                                            <div className="mb-3">
                                                <input value={password} className="form-control text-center" type="password" placeholder="Enter the password" onChange={onChangePassword} />
                                            </div>
                                            <div className="mb-3">
                                                {message}
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
                        </div>
                    </div>))}
        </React.Fragment>
    )
}

export default Login
