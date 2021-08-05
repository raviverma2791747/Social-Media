import React from 'react'
import { FaImages, FaUserTag } from "react-icons/fa";
import { createPost, searchProfile } from "../api/Api";

function CreatePost() {

    const [content, setContent] = React.useState('');
    const [file, setFile] = React.useState('');
    const [showFileUpload, setShowFileUpload] = React.useState(false);
    const [tags, setTags] = React.useState([])
    const [tagSearch, setTagSearch] = React.useState('');
    const [tagResult, setTagResult] = React.useState([]);
    const [showSubmit, setShowSubmit] = React.useState(false);

    const submit = (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('content', content);
        uploadData.append('file', file);
        uploadData.append('tags',tags);
        createPost(uploadData).then((data) => {
            console.log(data);
        });
    }

    const onChangeContent = (e) => {
        setContent(e.target.value);
        if (content !== '' || file !== '') {
            setShowSubmit(true);
        } else {
            setShowSubmit(false);
        }
    }

    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
        if (content !== '' || file !== '') {
            setShowSubmit(true);
        } else {
            setShowSubmit(false);
        }
    }

    const searchUser = () => {
        searchProfile(tagSearch).then((data) => {
            if (data['status'] === 'success') {
                setTagResult(data['data'])
            }
        })
    }

    const addTag = (e) => {
        for(let i=0; i<tags.length;i++){
            if(tags[i]['username'] === e.target.innerText){
                return;
            }
        }
        setTags([...tags, { 'username': e.target.innerText }]);
    }

    const removeTag = (e) => {
        //setTags(...tags)
    }

    const closeModal = () => {
        setTagSearch('');
        setTagResult([]);
    }


    return (
        <React.Fragment>
            <div className="card shadow">
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <textarea className="form-control form-control-lg text-center" maxLength="500" placeholder="Write Something!" onChange={onChangeContent}></textarea>
                        </div>
                        {
                            showFileUpload ? (<div className="mb-3">
                                <input type="file" className="form-control" onChange={onChangeFile} accept=".png,.jpg,.jpeg,.mp4,.avi,.wmv,.ogg,.webm,.mov" />
                            </div>) : ''
                        }
                        {
                            (tags.length === 0) ? '' :
                                (<div>
                                    <ul className="list-group">
                                        {
                                            tags.map((tag) => {
                                                return (<li className="list-group-item list-group-item-action d-flex"><div className="flex-fill">{tag['username']}</div><div className="btn btn-close" onClick={(e) => { removeTag(e) }}></div></li>)
                                            })
                                        }
                                    </ul>
                                </div>)
                        }
                        <div className="mb-3 d-flex justify-content-start">
                            <div className="btn btn-lg" onClick={() => { setShowFileUpload(!showFileUpload); setFile(''); }}><FaImages /></div>
                            <div className="btn btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal"><FaUserTag /></div>
                        </div>
                        {
                            showSubmit ? (<div className="mb-3 d-flex">
                                <input type="submit" className="btn btn-primary me-3" value="Post" />
                                <button className="btn btn-outline-primary">Cancel</button>
                            </div>) : ''}
                    </form>
                </div>
            </div>
            <div class="modal fade" id="tagModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Tag User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div class="modal-body">
                            <div className="mb-3 d-flex">
                                <input class="form-control" type="text" placeholder="Enter the username" value={tagSearch} onChange={(e) => { setTagSearch(e.target.value) }} /><button className="btn btn-primary" onClick={searchUser}>Search</button>
                            </div>
                            <div>
                                <ul className="list-group">
                                    {
                                        tagResult.map((item) => {
                                            return (<li className="list-group-item list-group-item-action" data-bs-dismiss="modal" onClick={(e) => { addTag(e); closeModal(); }}>{item['username']}</li>)
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default CreatePost
