import React from 'react'
import { accountUpdate } from '../api/Api'
import { userContext } from '../App';

function ChangePassword() {
    const user = React.useContext(userContext);
    const [password, setPassword] = React.useState('');
    const [repassword, setRePassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [edit, setEdit] = React.useState(false);
    const changePassword = () => {
        setEdit(true);
    }

    const cancel = () => {
        setEdit(false);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeRePassword = (e) => {
        setRePassword(e.target.value);
    }


    const submit = () => {
        let data = { password: password, re_password: repassword }
        accountUpdate(data).then((data) => {
            if (data['status'] === 'success') {
                setEdit(false);
                setPassword('');
                setRePassword('');
                user.setAuthenticate(false);
            } else {
                {
                    setMessage(data['message']);
                }
            }
        })
    }

    return (
        <div>
            {
                edit ?
                    (
                        <React.Fragment>
                            <div className="mb-4">
                                <input type="password" className="form-control" placeholder="Enter the password" value={password} onChange={onChangePassword} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Enter the confirmation password" value={repassword} onChange={onChangeRePassword} />
                                <div className="form-control-text">{message}</div>
                            </div>
                            <button className="btn btn-primary" onClick={submit}>Submit</button>
                            <button className="btn btn-outline-primary" onClick={cancel}>Cancel</button>
                        </React.Fragment>
                    )
                    : (<button className="btn btn-outline-primary" onClick={changePassword}>Change Password </button>)
            }
        </div>
    )
}

export default ChangePassword
