import React, { useState } from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed'
import { Redirect } from 'react-router-dom'
import { accountIsAuthenticated } from '../api/Api'
import Loading from '../components/Loading'

function Home() {
    const [authenticate, setAuthenticate] = useState(false);
    const [loading, setLoading] = useState(true);

    accountIsAuthenticated().then((data) => {
        if (data["status"] == "success") {
            setAuthenticate(true);
        }
        setLoading(false);
    })

    return (<React.Fragment>
        {
            authenticate ? (<React.Fragment>
                <Header title="Social Media" />
                <div className="container">
                    <div className="row">
                        <div className="col-6 p-5">
                            <Feed />
                        </div>
                    </div>
                </div>
            </React.Fragment>) : (loading ? (<Loading />) : (<Redirect to="/" />))
        }
    </React.Fragment>)

}

export default Home;
