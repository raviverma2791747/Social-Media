import React from 'react'
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import {likePost,unLikePost} from '../../api/Api'

function Like({liked,post_id}) {
    const [isLiked,setIsLiked] = React.useState(false)


    const handleLike = ()=> {
        likePost({'post_id' : post_id}).then((data)=>{
            if(data['status'] === 'success'){
                setIsLiked(true)
            }
        })
    }
    const handleUnLike = ()=> {
        unLikePost({'post_id' : post_id}).then((data)=>{
            if(data['status'] === 'success'){
                setIsLiked(false)
            }
        })
    }
    React.useEffect(()=>{
        setIsLiked(liked);
    },[liked]);
    
    return (
        isLiked ? <button className="btn btn-lg" onClick={handleUnLike}><FaThumbsUp /> Like</button> : <button className="btn btn-lg" onClick={handleLike}><FaRegThumbsUp /> Like</button>
    )
}

Like.defaultProps = {
    'liked' : false,
    'post_id' : 0
}
export default Like
