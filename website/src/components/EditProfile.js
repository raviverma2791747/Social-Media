import React from 'react'
import {accountUpdate, profileUpdate} from '../api/Api'
import '../components/css/editprofile.css'

function EditProfile(props) {
    const [edit, setEdit] = React.useState(false)
    const [text, setText] = React.useState('');
    const [gender,setGender] = React.useState('');
    const [file, setFile] = React.useState(null);
    const type = {
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'gender': 'Gender',
        'dob': 'Date of Birth',
        'contact': 'Contact',
        'email': 'Email',
        'profileImg': 'Porfile Image',
        'profileBanner': 'Profile Banner'
    }

    React.useEffect(() => {
        switch (props.type) {
            case 'firstName':
            case 'lastName':
            case 'email':
                setText(props.value);
                break;
            case 'gender':
                setGender(props.value);
                break;
            case 'dob':
            case 'contact':
                break;
            case 'profileImg':
                break;
            case 'profileBanner':
                break;
            default:
                break;
        }
    }, [props])

    const onChangeInput = (e) => {
        setText(e.target.value);
    }

    const onChangeGender = (e) => {
        setGender(e.target.value);
    }

    const submit = ()=>{
        let data = {}
        switch (props.type) {
            case 'firstName':
                data['first_name'] = text;
                break;
            case 'lastName':
            case 'email':

                 break;
            case 'gender':
                break;
            case 'dob':
            case 'contact':
               break;
            case 'profileImg':
                break;
            case 'profileBanner':
               break;
            default:
                break;
        }
        console.log(data)
        profileUpdate(data).then((response)=>{
            if(response['status'] === 'success'){
                setEdit(false);
            }else{
                console.log(response);
            }
        })
    }

    return (
        <React.Fragment>
            {
                edit ? (
                    <React.Fragment><div className="fw-bold">{type[props.type]} : </div>
                        {
                            (() => {
                                switch (props.type) {
                                    case 'firstName':
                                    case 'lastName':
                                    case 'email':
                                        return (<div className="mb-3"><input className="form-control" type={props.type === 'email' ? 'email' : 'text'} value={text} onChange={onChangeInput} /></div>)
                                    case 'gender':
                                        return (
                                            <div className="mb-3">
                                                <select className="form-select form-select-sm" onChange={onChangeGender}>
                                                    <option value="M" selected={gender === 'M' ? 'true' : 'false'}> Male</option>
                                                    <option value="F" selected={gender === 'F' ? 'true' : 'false'}>Female</option>
                                                    <option value="O" selected={gender === 'O' ? 'true' : 'false'}>Other</option>
                                                </select>
                                            </div>
                                        )
                                    case 'dob':
                                    case 'contact':
                                        return props.value === null ? (<div>Unknown'</div>) : (<div>{props.value}</div>);
                                    case 'profileImg':
                                        return (<div>
                                            <img className="img-thumbnail" src={props.value} />
                                        </div>)
                                    case 'profileBanner':
                                        return (<div className="profile-banner">
                                            <img className="img-fluid" src={props.value} />
                                        </div>);
                                    default:
                                        break;
                                }
                            })()
                        }
                        <div className="d-flex flex-row">
                            <button className="btn btn-sm btn-primary me-3" onClick={submit}>Submit</button>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => { setEdit(false) }}>Cancel</button>
                        </div>
                    </React.Fragment>
                ) :
                    (
                        <React.Fragment><div className="fw-bold">{type[props.type]} : </div>
                            {
                                (() => {
                                    switch (props.type) {
                                        case 'firstName':
                                        case 'lastName':
                                        case 'email':
                                            return (<div>{props.value}</div>);
                                        case 'gender':
                                            {
                                                switch (props.value) {
                                                    case 'M':
                                                        return (<div>Male</div>);
                                                    case 'F':
                                                        return (<div>Female</div>);
                                                    case 'O':
                                                        return (<div>Other</div>);
                                                    default:
                                                        return (<div>Unknown</div>);
                                                }
                                            }
                                        case 'dob':
                                        case 'contact':
                                            return props.value === null ? (<div>Unknown'</div>) : (<div>{props.value}</div>);
                                        case 'profileImg':
                                            return (<div className="ratio ratio-1x1">
                                                <img className="img-fluid" src={props.value} />
                                            </div>)
                                        case 'profileBanner':
                                            return (<div className="ratio ratio-16x9">
                                                <img className="img-fluid" src={props.value} />
                                            </div>);
                                        default:
                                            break;
                                    }
                                })()
                            }
                            <div className="text-decoration-underline text-primary" onClick={() => { setEdit(true) }}>Edit</div>
                        </React.Fragment>
                    )
            }
        </React.Fragment>
    )
}

EditProfile.defaultPorps = {

}

export default EditProfile
