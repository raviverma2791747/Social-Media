import React from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Spinner from '../components/ui/Spinner'
import { Redirect } from "react-router-dom";
import { getSettings, profileCurrentUser, profileUpdate } from '../api/Api'
import { userContext } from '../App'
import ChangePassword from './ChangePassword';
import Date from '../components/ui/Date';


function Settings() {
    const user = React.useContext(userContext);
    const [loading, setLoading] = React.useState(true);
    const [userData, setUserData] = React.useState('');
    const [darkMode,setDarkMode] =React.useState(false);

    const fetchData = () => {
        //setLoading(true);
        profileCurrentUser().then((data) => {
            if (data['status'] === 'success') {
                setLoading(false);
                setUserData(data['data']);
            }
        })
    }

    const fetchSettings = ()=> {
        getSettings().then((data)=>{
            if(data['status'] === 'success'){
                setDarkMode(data['data']['dark_mode'])
            }
        })
    }

    const onChangeDarkMode = (e)=>{
        setDarkMode(!darkMode);
    }

    React.useEffect(() => {
        if (user.authenticate && loading) {
            fetchData();
            fetchSettings();
        }
    }, [user, loading])

    return (
        <React.Fragment>
            <Header />
            {user.authenticate ?
                (<div className="container py-5 px-0">
                    <div className="row mx-0">
                        <div className="col-3">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h4 className="text-center">Settings</h4>
                                    <div className="nav flex-column nav-pills h-auto" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">General</button>
                                        <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
                                        <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">App settings</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 ">
                            <div className="tab-content" id="v-pills-tabContent">
                                {
                                    loading ? (<div className="tab-pane fade show active shadow" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><Spinner /></div>) : (<React.Fragment>
                                        <div className="tab-pane fade show active shadow" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            <div className="container py-3">
                                                <h4 className="text-center">General Settings</h4>
                                                <div className="mb-3">
                                                    <span className="fw-bold">Username : </span> <span>{userData['username']}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <span className="fw-bold">Account Created: </span><span><Date datetime={userData['join_date']} /></span>
                                                </div>
                                                <div className="mb-3">
                                                </div>
                                                <div className="mb-3">
                                                    <ChangePassword />
                                                </div>
                                                <div className="mb-3">
                                                    <button className="btn btn-primary">Delete Account</button>
                                                    <input type="password" className="form-control d-none" disabled readonly />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade shadow" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                            <div className="container py-3">
                                                <h4 className="text-center">Profile Settings</h4>
                                                <EditProfile value={userData} callback={fetchData} />
                                            </div>
                                        </div>
                                        <div className="tab-pane fade shadow" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                            <div className="container py-3">
                                                <h4 className="text-center">App and Website Settings</h4>
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultChecked={darkMode} onChange={onChangeDarkMode} />
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>)
                                }
                            </div>
                        </div>
                    </div>
                </div>) : (loading ? (<Loading />) : (<Redirect to="" />))
            }
        </React.Fragment>
    )
}


function EditProfile(props) {
    const [loading, setLoading] = React.useState(true);
    const [edit, setEdit] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [contact, setContact] = React.useState(null);
    const [gender, setGender] = React.useState('Unknown');
    const [desc, setDesc] = React.useState('');
    const [dob, setDob] = React.useState(null);
    const [profileImg, setProfileImg] = React.useState(null);
    const [profileBanner, setProfileBanner] = React.useState(null);
    const [message, setMessage] = React.useState('');



    React.useEffect(() => {
        setFirstName(props.value['first_name']);
        setLastName(props.value['last_name']);
        setDesc(props.value['desc']);
        setEmail(props.value['email']);
        setDob(props.value['dob']);
        setGender(props.value['gender']);
        setContact(props.value['contact']);
        setLoading(false);
    }, [props]);

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
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

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeDesc = (e) => {
        setDesc(e.target.value);
    }

    const onChangeContact = (e) => {
        setContact(e.target.value);
    }

    const onChangeProfileImg = (e) => {
        setProfileImg(e.target.files[0]);
    }
    const onChangeProfileBanner = (e) => {
        setProfileBanner(e.target.files[0]);
    }

    const submit = () => {
        setLoading(true);
        const uploadData = new FormData();
        if (props.value['first_name'] !== firstName) {
            uploadData.append('first_name', firstName);
        }
        if (props.value['last_name'] !== lastName) {
            uploadData.append('last_name', lastName);
        }
        if (props.value['email'] !== email) {
            uploadData.append('email', email);
        }
        if(props.value['gender'] !== gender){
            uploadData.append('gender',gender);
        }
        if (props.value['contact'] !== contact) {
            uploadData.append('contact', contact.toString());
        }
        if (props.value['desc'] !== desc) {
            uploadData.append('desc', desc);
        }
        if (props.value['dob'] !== dob) {
            uploadData.append('dob', dob);
        }
        if (profileImg !== null) {
            uploadData.append('profile_img', profileImg);
        }
        if (profileBanner !== null) {
            uploadData.append('profile_banner', profileBanner);
        }

        profileUpdate(uploadData).then((data) => {
            if (data['status'] === 'success') {
                props.callback()
                setEdit(false);
            } else {
                setMessage(data['message']);
            }
            setLoading(false);
        })

    }

    const cancel = () => {
        setFirstName(props.value['first_name']);
        setLastName(props.value['last_name']);
        setDesc(props.value['desc']);
        setEmail(props.value['email']);
        setDob(props.value['dob']);
        setGender(props.value['gender']);
        setContact(props.value['contact']);
        setProfileBanner(null);
        setProfileBanner(null);
        setEdit(false);
    }

    return (<React.Fragment>
        {
            loading ? <Spinner /> : (edit ?
                (<React.Fragment>
                    <div className="mb-3" >
                        <input className="form-control" type="text" value={firstName} placeholder="Enter the first name" onChange={onChangeFirstName} />
                    </div>
                    <div className="mb-3" >
                        <input className="form-control" type="text" value={lastName} placeholder="Enter the last name" onChange={onChangeLastName} />
                    </div>
                    <div className="mb-3" >
                        <input className="form-control" type="date" value={dob} onChange={onChangeDob} />
                    </div>
                    <div className="mb-3">
                        <select className="form-select form-select-sm" onChange={onChangeGender}>
                            <option value="Male" selected={gender==='Male'}>Male</option>
                            <option value="Female"  selected={gender==='Female'}>Female</option>
                            <option value="Other"  selected={gender==='Other'}>Other</option>
                        </select>
                    </div>
                    <div className="mb-3" >
                        <input className="form-control" type="email" value={email} onChange={onChangeEmail} />
                    </div>
                    <div className="mb-3" >
                        <input className="form-control" type="number" value={contact} onChange={onChangeContact} maxLength="10"/>
                    </div>
                    <div className="mb-3" >
                        <textarea className="form-control" type="text" value={desc} onChange={onChangeDesc}></textarea>
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="file" onChange={onChangeProfileImg} accept=".png,.jpg,.jpeg" />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="file" onChange={onChangeProfileBanner} accept=".png,.jpg,.jpeg" />
                    </div>
                    <div className="mb-3">
                        <div className="form-control-text mb-3">{message}</div>
                        <div className="d-flex flex-row">
                            <button className="btn btn-sm btn-primary me-3" onClick={submit}>Submit</button>
                            <button className="btn btn-sm btn-outline-primary" onClick={cancel}>Cancel</button>
                        </div>
                    </div>
                </React.Fragment>) : (<React.Fragment>
                    <div className="mb-3">
                        <div className="fw-bold">First Name: </div>
                        <div>{props.value['first_name']}</div>
                    </div>
                    <div className="mb-3">
                        <div className="fw-bold">Last Name: </div>
                        <div>{props.value['last_name']}</div>
                    </div>
                    <div className="mb-3">
                        <div className="fw-bold">Date of Birth: </div>
                        <div>{props.value['dob']}</div>
                    </div>
                    <div className="mb-3">
                        <div className="fw-bold">Gender: </div>
                        <div>{props.value['gender']}</div>
                    </div>
                    <div className="mb-3">
                        <div className="fw-bold">Email: </div>
                        <div>{props.value['email']}</div>
                    </div>
                    <div className="mb-3">
                        <div className="fw-bold">Contact: </div>
                        <div>{props.value['contact']}</div>
                    </div>
                    <div className="mb-3">
                        <div className="fw-bold">Desc: </div>
                        <div>{props.value['desc']}</div>
                    </div>
                    <div className="mb-3">
                        <div className="fw-bold">Profile Image: </div>
                        <div className="aspect ratio-1x1"><img className="img-fluid" src={props.value['profile_img']} /></div>
                    </div>
                    <div className="mb-3">
                        <div className="fw-bold">Profile Banner: </div>
                        <div className="aspect ratio-21x9"><img className="img-fluid" src={props.value['profile_banner']} /></div>
                    </div>
                    <div className="mb-3">
                        <div className="btn btn-primary" onClick={() => { setEdit(true) }}>Update</div>
                    </div>
                </React.Fragment>))
        }
    </React.Fragment>)
}

EditProfile.defaultProps = {
    value: ''
}

export default Settings
