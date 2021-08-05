import React from 'react'
import { profileUser, accountIsAuthenticated } from '../api/Api'
import Header from "../components/Header";
import Banner from '../components/Banner';
import Bio from '../components/Bio';
import ProfileImg from '../components/ProfileImg'
import Feed from '../components/Feed'
import Loading from '../components/Loading'
import { Redirect, useParams } from "react-router-dom";
import CreatePost from './CreatePost';
import AllPost from './AllPost';
import Spinner from '../components/ui/Spinner'
import {userContext} from '../App'

function Profile() {
    const user = React.useContext(userContext);
    const [loading, setLoading] = React.useState(true);
    const [userData, setUserData] = React.useState({});
    let { username } = useParams();

    React.useEffect(() => {

        if(loading && user.authenticate){
            profileUser(username).then((data) => {
                if (data["status"] === "success") {
                    setUserData(data['data']);
                }
                setLoading(false);
            })
        }
    }, [username, user, loading])

    return (
        <React.Fragment>
            {
                user.authenticate ?
                    (<React.Fragment><Header title="Social Media" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 col-md-6 mx-auto">
                                    <div className="container-fluid p-0">
                                        <div className="row  position-relative">
                                            {loading ? (<Banner />) : (<Banner loading={false} src={userData['profile_banner']} />)}
                                            {loading ? (<ProfileImg />) : (<ProfileImg loading={false} src={userData['profile_img']} />)}
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-4 p-0">
                                                {
                                                    loading ? (<Bio />) :
                                                        (<Bio loading={false} current_user={userData['current_user']}
                                                            username={userData["username"]}
                                                            first_name={userData['first_name']}
                                                            last_name={userData['last_name']}
                                                            join_date={userData['join_date']}
                                                            desc={userData['desc']}
                                                            email={userData['email']}
                                                            followers={userData['followers']}
                                                            followings={userData['followings']}
                                                            current_user_following={userData['current_user_following']}
                                                        />)
                                                }
                                            </div>
                                            <div className="col-12 col-md-8 p-0">
                                                { loading ? '' : userData['current_user'] ? <CreatePost /> : ''}
                                                { loading ? <Spinner/> : <AllPost username={userData['username']}/> } 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>) : (loading ? (<Loading />) : (<Redirect to='/' />))
            }
        </React.Fragment>
    )
}

export default Profile
