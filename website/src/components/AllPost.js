import React from 'react'
import Post from '../components/Post'
import Spinner from '../components/ui/Spinner'
import { getAllPost } from '../api/Api'

function AllPost({ username }) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        if (loading) {
            getAllPost(username).then((data) => {
                if (data['status'] === 'success') {
                    setData(data['data']);
                    setLoading(false);
                }
            })
        }
    }, [username])

    return (

        <div className="container-fluid d-flex flex-column justify-content-center px-0">
            {
                loading ? <Spinner /> : data.map((post) => {
                    return (<Post loading={false} data={post} />)
                })
            }
        </div>
    )
}

AllPost.defaultProps = {
    'username': ''
}
export default AllPost
