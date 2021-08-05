import React from 'react'
import Header from '../components/Header'
import {useParams} from 'react-router-dom'

function Search() {
    const search = useParams();

    return (
        <div>
            <Header/>
            
        </div>
    )
}


function SearchItem(props) {
    return (<div></div>)
}

export default Search
