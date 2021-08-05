import React from 'react'
import Date from '../components/ui/Date'

function Comment({data}) {
    return (
        <div className="d-flex flex-row">
            <div>
                <img src={data['profile_img']} className="rounded-circle w-5 post-profile-img" />
            </div>
            <div className="flex-grow-1 flex-column">
                <div></div>
                <p>
                    {
                        data['content']
                    }
                </p>
            </div>
        </div>
    )
}

Comment.defaultProps = {
    'data' : {}
}

export default Comment
