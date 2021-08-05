import React from 'react'

function Toast() {
    return (
        <React.Fragment>
            < div className="toast align-items-center shadow" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
                <div className="d-flex">
                    <div className="toast-body">
                        Hello, world! This is a toast message.
                    </div>
                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>

        </React.Fragment >
    )
}

export default Toast
