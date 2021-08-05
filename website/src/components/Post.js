import React from 'react'
import Spinner from '../components/ui/Spinner'
import Date from '../components/ui/Date'
import { FaEllipsisH, FaRegThumbsUp, FaRegCommentAlt, FaRegShareSquare, FaRegEdit, FaRegTrashAlt, FaLink } from "react-icons/fa";
import '../components/css/Post.css'
import { Link } from "react-router-dom";
import Like from '../components/ui/Like'
import AllComment from '../components/AllComment'
import { postDelete } from '../api/Api';
import CreatePost from './CreatePost';

function Post({ loading, data }) {
    const [showComments, setShowComments] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);
    const [edit, setEdit] = React.useState(false);

    const handleComment = () => {
        if (showComments) {
            setShowComments(false);
        } else {
            setShowComments(true);
        }

    }

    const deletePost = () => {
        postDelete({ 'post_id': data['id'] }).then((data) => {
            if (data['status'] === 'success') {
                setDeleted(true);
                console.log('ok')
            }
        })
    }

    const handleEdit = () => {
        setEdit(true);
    }

    return (
        <React.Fragment>
            {deleted ? '' : (edit ? <CreatePost /> : (<div className="card shadow mt-2">
                {
                    loading ? (<Spinner />) :
                        (<React.Fragment>
                            <div className="card-header d-flex">
                                <div className="d-flex flex-grow-1">
                                    <img src={data['profile_img']} className="rounded-circle w-5 post-profile-img" />
                                    <div className="d-flex flex-column">
                                        <span>{data['name']}</span>
                                        <Link to="">{data['username']}</Link>
                                        <span><Date datetime={data['created']} /></span>
                                    </div>
                                </div>
                                <div className="dropdown">
                                    <button className="btn" data-bs-toggle="dropdown">
                                        <FaEllipsisH />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><button className="dropdown-item"><FaLink /> Copy Link</button></li>
                                        {data['owner'] ? (<React.Fragment><li><button className="dropdown-item" onClick={handleEdit}><FaRegEdit /> Edit Post</button></li>
                                            <li><button className="dropdown-item" onClick={deletePost}><FaRegTrashAlt /> Delete Post</button></li></React.Fragment>) : ''}
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <p>
                                    {
                                        loading ? '' : data['content']
                                    }
                                </p>
                                {data['type'] == 'image' ? (<div className="text-center"><img src={data['image']} className="img-fluid" /></div>) : ''
                                }
                                {
                                    data['type'] == 'video' ? (<div className="ratio ratio-4x3"><video src={data['video']} controls></video></div>) : ''
                                }
                            </div>
                            <div className="card-footer d-flex flex-column">
                                <div className="d-flex justify-content-between">
                                    <Like liked={data['current_user_liked']} post_id={data['id']} />
                                    <button className="btn btn-lg" onClick={handleComment} ><FaRegCommentAlt /> Comment</button>
                                    <button className="btn btn-lg"><FaRegShareSquare /> Share</button>
                                </div>
                                {showComments ? <AllComment post_id={data['id']} /> : ''}
                            </div>
                        </React.Fragment>)
                }
            </div>))
            }
        </React.Fragment>
    )
}

Post.defaultProps = {
    'loading': true,
    'data': {}
}

export default Post
