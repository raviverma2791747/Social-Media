import React from 'react'

function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading
