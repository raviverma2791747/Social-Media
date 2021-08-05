import React from 'react'
import {followUser} from '../api/Api'

function Test() {

    followUser({'username' : 'raviverma'}).then((data)=>{
        console.log(data);
    });

    return (
        <div>
        </div>
    )
}

export default Test
