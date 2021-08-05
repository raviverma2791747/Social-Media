import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { accountIsAuthenticated, getPost } from "../api/Api";
import Header from "../components/Header";
import Post from '../components/Post'
import Loading from '../components/Loading'

function PostView() {
    const { post_id } = useParams();
    const [authenticate, setAuthenticate] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [postData, setPostData] = React.useState({});


    React.useEffect(
        () => {
            if (!authenticate && loading) {
                accountIsAuthenticated().then((data) => {
                    if (data["status"] === "success") {
                        setAuthenticate(true);
                    }
                })

                getPost(post_id).then((data) => {
                    if (data["status"] === "success") {
                        setPostData(data['data']);
                        setLoading(false);
                    }
                });
            }
        }, [post_id, authenticate, loading]
    );

    return (
        <React.Fragment>
            {
                authenticate ?
                    (<React.Fragment><Header title="Social Media" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-4 mx-auto">
                                    {loading ? <Post /> : <Post loading={false} data={postData} />}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>) : (loading ? (<Loading />) : (<Redirect to='/' />))
            }
        </React.Fragment>
    )
}

export default PostView
