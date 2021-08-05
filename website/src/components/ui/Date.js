import React from 'react'

function Date({datetime}) {
    let date='';
    if(datetime.includes('T')){
        date = datetime.split('T')[0];
    }
    return (
        <React.Fragment>
            {date}
        </React.Fragment>
    )
}

Date.defaultProps = {
    datetime : ''
}
export default Date
