import React from 'react'
import Comment from '../components/Comment'
import Spinner from '../components/ui/Spinner'
import { getAllPostComment, postPostComment ,getComment} from '../api/Api'

function AllComment({ post_id }) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({});
    const [newComment, setNewComment] = React.useState('');

    const onChangeComment = (e) => {
        setNewComment(e.target.value);
    }

    const createNewComment = (e) => {
        if (e.key === 'Enter') {
            postPostComment({ 'post_id': post_id, 'content': newComment }).then((rdata) => {
                if (rdata['status'] === 'success') {
                    setNewComment('');
                    getComment(rdata['data']['comment_id']).then((comment_data)=>{
                        if(comment_data['status'] === 'success'){
                            setData([comment_data['data'],...data]);
                        }
                    })
                }
            })
        }
    }

    React.useEffect(() => {
        if (loading) {
            getAllPostComment(post_id).then((data) => {
                if (data['status'] === 'success') {
                    setData(data['data'])
                    setLoading(false);
                }
            })
        }
    }, [loading]);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex mb-3">
                <input className="form-control" placeholder="Type a comment" type="text" name="comment" value={newComment} onChange={onChangeComment} onKeyDown={createNewComment} />
            </div>
            {
                loading ? <div className="text-center"><Spinner /></div> : data.map((comment) => {
                    return <Comment data={comment} />
                })
            }
        </div>
    )
}

AllComment.defaultProps = {
    'post_id': 0
}

export default AllComment
