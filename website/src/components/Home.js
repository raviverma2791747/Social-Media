import React from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed'
import  { Redirect } from 'react-router-dom'
import {accountIsAuthenticated } from '../api/Api'

function Home() {

    /*accountIsAuthenticated().then((data)=>{
        if(data["status"] !== "success"){
            return <Redirect to='/'  />
        }
    })*/

    return (
        <React.Fragment>
            <Header title="Social Media" />
            <div className="container">
                <div className="row">
                    <div className="col-6 p-5">
                        <Feed/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home
