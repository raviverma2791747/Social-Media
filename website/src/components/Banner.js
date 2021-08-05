import React from 'react'
import Spinner from '../components/ui/Spinner'

function Banner({ loading, src }) {
    return (
        <div className="d-flex justify-content-center align-items-center shadow h-100">
            <div className="ratio ratio-21x9">
                {loading ? (<Spinner />) : (<img src={src} alt='some error' />)}
            </div>
        </div>
    )
}


Banner.defaultProps = {
    'loading': true,
    'src': ''
}
export default Banner
