import React from 'react'
import Spinner from "../components/ui/Spinner";

function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
           <Spinner/>
        </div>
    )
}

export default Loading
