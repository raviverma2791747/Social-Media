import React, { useState } from 'react'
import '../components/css/Signup.css'
import {Link,useHistory} from "react-router-dom";
import {accountRegister} from '../api/Api'

function Signup() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRpassword] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeRpassword = (e) => {
        setRpassword(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        let data = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            re_password: rpassword
        };

        accountRegister(data).then((data)=>{
            console.log(data);
            if(data['status'] === 'success'){
                history.push('/home')
            }
        })
    }

    return (
        <div className="container-fluid vh-100">
            <div className="row vh-100">
                <div className="col-md bg-primary d-flex flex-column justify-content-center align-items-center">
                    <div>
                        <h1 className="fw-bold text-secondary"><Link className="brand" to="/">Social Media</Link></h1>
                    </div>
                </div>
                <div className="col-md d-flex bg-secondary flex-column justify-content-center align-items-center">
                    <div id="signup-card" className="card shadow">
                        <div className="card-body p-5">
                            <h3 className="card-title text-center text-primary my-4">Sign Up</h3>
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <input className="form-control text-center" name="username" type="text" placeholder="Enter the username" onChange={onChangeUsername} />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control text-center" name="first_name" type="text" placeholder="Enter the first name" onChange={onChangeFirstName} />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control text-center" name="last_name" type="text" placeholder="Enter the last name" onChange={onChangeLastName} />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control text-center" name="email" type="email" placeholder="Enter the email" onChange={onChangeEmail} />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control text-center" name="password" type="password" placeholder="Enter the password" onChange={onChangePassword} />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control text-center" name="rpassword" type="password" placeholder="Enter the password" onChange={onChangeRpassword} />
                                </div>
                                <div className="mb-3 text-center">
                                    <input className="btn btn-primary" name="submit" type="submit" placeholder="Enter the password"/>
                                </div>
                                <div className="mb-3">
                                    <Link className="form-text" to="/login">Already registered click here to login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
