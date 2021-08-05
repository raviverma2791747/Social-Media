import React from 'react'

function Input({type}) {
    return (
        <div className="mb-3">
            <input type={type} className="form-control" />
        </div>
    )
}

Input.defaultProps = {
    'type' : 'text',
}

export default Input
