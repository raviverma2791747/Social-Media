import React, { useState } from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed'
import { Redirect } from 'react-router-dom'
import { accountIsAuthenticated, profileCurrentUser } from '../api/Api'
import Loading from '../components/Loading'
import CreatePost from "../components/CreatePost";
import Bio from '../components/Bio'
import { userContext } from '../App'

function Home() {
    const user = React.useContext(userContext);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = React.useState(true);

    React.useEffect(() => {
        if (user.authenticate) {
            profileCurrentUser().then((data) => {
                if (data['status'] === 'success') {
                    setUserData(data['data']);
                }
                setLoading(false);
            })

        } else {
            setLoading(false);
        }
    }, [user, loading])

    return (<React.Fragment>
        {
            user.authenticate ? (<React.Fragment>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-4">
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
                        <div className="col-12 col-lg-6">
                            <CreatePost />
                            <Feed/>
                        </div>
                    </div>
                </div>
            </React.Fragment>) : (loading ? (<Loading />) : (<Redirect to="/" />))
        }
    </React.Fragment>)

}

export default Home;
