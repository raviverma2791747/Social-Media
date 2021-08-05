import React from 'react'
import Follow from '../components/Follow';
import Spinner from '../components/ui/Spinner'
import { Link } from 'react-router-dom';
import Date from '../components/ui/Date'

function Bio({ loading, current_user, first_name, last_name, username, email, desc, join_date, followers, followings, current_user_following }) {
    return (
        <div className="card shadow" >
            {loading ? (<div className="d-flex justify-content-center p-5"><Spinner /></div>) : (<div className="card-body d-flex flex-column">
                <h5 className="card-title">{first_name + ' ' + last_name}</h5>
                <Link className="text-decoration-none" to={+username} >@{username}</Link>
                <span><Date datetime={join_date} /></span>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                </svg> {email}</span>
                <p className="card-text">{desc}</p>
                <Follow username={username} followers={followers} followings={followings} current_user={current_user} current_user_following={current_user_following} />
            </div>)
            }
        </div>
    )
}


Bio.defaultProps = {
    'loading': true,
    'current_user': false,
    'first_name': '',
    'last_name': '',
    'email' : '',
    'username': '',
    'join_date': '',
    'desc': '',
    'followers': [],
    'followings': [],
    'current_user_following': false
}

export default Bio
