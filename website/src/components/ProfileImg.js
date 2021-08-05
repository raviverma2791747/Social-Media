import React from 'react'
import Spinner from '../components/ui/Spinner'
import '../components/css/ProfileImg.css'

function ProfileImg({ loading, src }) {
    return (
        <div className="raito ratio-1x1">
            {
                loading ? (<Spinner />) : (<img className="profile-img rounded-circle shadow" src={src} alt="some error" />)
            }
        </div>
    )
}

ProfileImg.defaultProps = {
    'loading': true,
    'src': ''
}

export default ProfileImg
