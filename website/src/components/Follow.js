import React from 'react'
import { followUser, unfollowUser } from '../api/Api'
import { Link } from 'react-router-dom'

function Follow({ username, followings, followers, current_user, current_user_following }) {
    const [follow, setFollow] = React.useState(false);
    const [followersCount, setFollowersCount] = React.useState(0);
    const [followingsCount, setFollowingsCount] = React.useState(0);

    const handleUnFollow = () => {
        unfollowUser({ 'username': username }).then((data) => {
            if (data['status'] === 'success') {
                setFollow(false);
                setFollowersCount(followersCount - 1);
            }
        })
    }

    const handleFollow = () => {
        followUser({ 'username': username }).then((data) => {
            if (data['status'] === 'success') {
                setFollow(true);
                setFollowersCount(followersCount + 1);
            }
        })
    }

    React.useEffect(() => {
        setFollow(current_user_following);
        setFollowersCount(followers.length);
        setFollowingsCount(followings.length)

    }, [current_user_following, followers, followings]);


    return (
        <React.Fragment>
            <div className="d-flex flex-row justify-content-between mb-3">
                <div className="fw-bold dropdown" >
                    <div type="button" data-bs-toggle="dropdown">{followingsCount} Following</div>
                    <ul class="dropdown-menu">
                        {
                            followings.map((following) => {
                                return (<li><Link className="dropdown-item" to={'/profile/'+following['username']} >@{following['username']}</Link></li>)
                            })
                        }
                    </ul>
                </div>
                <div className="fw-bold dropdown">
                    <div type="button" data-bs-toggle="dropdown">{followersCount} Followers</div>
                    <ul class="dropdown-menu">
                        {
                            followers.map((follower) => {
                                return (<li><Link className="dropdown-item" to={'/profile/'+follower['username']} >@{follower['username']}</Link></li>)
                            })
                        }
                    </ul>
                </div>
            </div>
            {current_user ? '' : follow ? (<button className="btn btn-outline-primary" onClick={handleUnFollow}>Unfollow</button>) : (<button className="btn btn-primary" onClick={handleFollow}>Follow</button>)}
        </React.Fragment>)
}

Follow.defaultProps = {
    'username': '',
    'followers': [],
    'followings': [],
    'current_user': false,
    'current_user_following': false
}
export default Follow
