import React, { useState } from 'react'
import '../components/css/Signup.css'
import { Link, useHistory, Redirect } from "react-router-dom";
import { accountIsAuthenticated, accountRegister } from '../api/Api'
import Loading from '../components/Loading'

function Signup() {
    const history = useHistory();
    const [authenticate, setAuthenticate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('U');
    const [dob, setDob] = useState(null);
    const [contact, setContact] = useState(null);
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

    const onChangeDob = (e) => {
        setDob(e.target.value);
    }

    const onChangeGender = (e) => {
        setGender(e.target.value);
    }

    const onChangeContact = (e) => {

        setContact(e.target.value);

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

    accountIsAuthenticated().then((data) => {
        if (data["status"] === "success") {
            console.log(data);
            setAuthenticate(true)
        }
        setLoading(false);
    })

    const submit = (e) => {
        e.preventDefault();


        let data = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            dob: dob,
            contact: contact,
            gender: gender,
            email: email,
            password: password,
            re_password: rpassword
        };

        console.log(data);

        accountRegister(data).then((data) => {
            console.log(data);
            if (data['status'] === 'success') {
                history.push('/home')
                setFirstName('');
                setLastName('');
                setUsername('');
                setEmail('');
                setPassword('');
                setRpassword('');

            }
            setMessage(data["message"]);
        })
    }

    return (
        <React.Fragment>
            {authenticate ? (<Redirect to="/home" />) : (loading ? (<Loading />) : (<div className="container-fluid vh-100"><div className="row vh-100">
                <div className="col-md bg-primary d-flex flex-column justify-content-center align-items-center">
                    <div>
                        <h1 className="fw-bold text-secondary"><Link className="brand" to="/">Social Media</Link></h1>
                    </div>
                </div>
                <div className="col-md d-flex bg-secondary flex-column justify-content-center align-items-center">
                    <div id="signup-card" className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center text-primary my-4">Sign Up</h3>
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <input className="form-control text-center" name="username" type="text" placeholder="Enter the username" onChange={onChangeUsername} />
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <input className="form-control text-center" name="first_name" type="text" placeholder="Enter the first name" onChange={onChangeFirstName} />
                                    </div>
                                    <div className="col">
                                        <input className="form-control text-center" name="last_name" type="text" placeholder="Enter the last name" onChange={onChangeLastName} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around mb-3" onChange={onChangeGender}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" value="M" />
                                        <label className="form-check-label">Male</label>
                                    </div>
                                    <div class="form-check">
                                        <input className="form-check-input" type="radio" name="gender" value="F" />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" value="O" />
                                        <label className="form-check-label">Other</label>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <input className="form-control text-center" name="dob" type="date" placeholder="Enter Date of Birth" onChange={onChangeDob} />
                                        <div className="form-text">Enter the date of birth</div>
                                    </div>
                                    <div className="col">
                                        <input className="form-control text-center" name="contact" type="number" placeholder="Enter the contact" onChange={onChangeContact} />
                                    </div>
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
                                    {message}
                                </div>
                                <div className="mb-3 text-center">
                                    <input className="btn btn-primary" name="submit" type="submit" placeholder="Enter the password" />
                                </div>
                                <div className="mb-3 text-center">
                                    <Link className="form-text" to="/login">Already registered click here to login</Link>
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

export default Signup
