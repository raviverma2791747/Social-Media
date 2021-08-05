import React from 'react'
import Spinner from '../components/ui/Spinner'
import Post from '../components/Post'
import {getFeed} from '../api/api'
import {userContext} from '../App'

function Feed() {
    const user = React.useContext(userContext);
    const [loading, setLoading] = React.useState(true);
    const [feedData, setFeedData] = React.useState([]);

    React.useEffect(()=>{
        if(user.authenticate && loading){
            getFeed().then((data)=>{
                if(data['status'] === 'success'){
                    setFeedData(data['data']['feed'])
                    setLoading(false);
                }
            })
        }
    },[user,loading]);

    return (
        <div className="container-fluid d-flex flex-column justify-content-center px-0">
            {
                loading ? <Spinner /> : feedData.map((post) => {
                    return (<Post loading={false} data={post} />)
                })
            }
        </div>
    )
}

export default Feed
