const BASE_URL = 'http://127.0.0.1:8000/api/';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function fetchCSRFToken() {
    let url = BASE_URL + 'getcsrf';
    console.log(url);

    fetch(url, {
        method: 'get',
    }).then((response) => {
        response.json();
    })
}

export function getCSRFToken() {
    return getCookie('csrftoken');
}

//Account
export function accountLogin(data) {
    let url = BASE_URL + 'account/login';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json',
    }

    return fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: headers,
    }).then((response) => {
        fetchCSRFToken();
        return response.json();
    })
}

export function accountRegister(data) {
    let url = BASE_URL + 'account/register';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    return fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: headers
    }).then((response) => {
        fetchCSRFToken();
        return response.json();
    })
}

export function accountLogout(data) {
    let url = BASE_URL + 'account/logout'
    
    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    return fetch(BASE_URL + 'account/logout', {
        method: 'post',
        body: JSON.stringify(data),
        headers: headers
    }).then((response) => {
        fetchCSRFToken();
        return response.json();
    })
}

export function accountIsAuthenticated() {
    let url = BASE_URL + 'account/isauthenticated';
    console.log(url);
    
    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    return fetch(url, {
        method: 'get',
        headers: headers
    }).then((response) => {
        return response.json();
    })
}

export function accountDelete() {
    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    return fetch(BASE_URL + 'account/delete', {
        method: 'delete',
        headers: headers
    }).then((response) => {
        return response.json();
    })
}

export function accountUpdate(data) {
    let url = BASE_URL + 'account/update'
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    return fetch(url, {
        method: 'put',
        headers: headers,
        body : JSON.stringify(data)
    }).then((response) => {
        return response.json();
    })
}


//Profile
export function profileUser(username) {
    let url = BASE_URL + 'profile/user/' + username;
    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'get',
        headers: headers
    }).then((response) => {
        return response.json();
    })
}

export function profileCurrentUser() {
    let url = BASE_URL + 'profile/user';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'get',
        headers: headers,
    }).then((response) => {
        return response.json();
    })
}


export function profileUpdate(data) {
    let url = BASE_URL + 'profile/update';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'post',
        headers: headers,
        body : data
    }).then((response) => {
        return response.json();
    })
}


//post
export function createPost(data) {
    let url = BASE_URL + 'post/create';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'post',
        headers: headers,
        body: data
    }).then((response) => {
        return response.json();
    });
}

export function followUser(data) {
    let url = BASE_URL + 'profile/follow';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    return fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    });
}

export function unfollowUser(data) {
    let url = BASE_URL + 'profile/unfollow';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    return fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    });
}


export async function getPost(post_id) {
    let url = BASE_URL + 'post/' + post_id.toString();
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    const response = await fetch(url, {
        method: 'get',
        headers: headers,
    });
    return await response.json();
}

export function getAllPost(username) {
    let url = BASE_URL + 'post/' + username;
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'get',
        headers: headers,
    }).then((response) => {
        return response.json();
    });
}

export function getFeed() {
    let url = BASE_URL + 'post/feed';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'get',
        headers: headers,
    }).then((response) => {
        return response.json();
    });
}

export function getSettings() {
    let url = BASE_URL + 'profile/setting';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'get',
        headers: headers,
    }).then((response) => {
        return response.json();
    });
}


export function getActivities() {
    let url = BASE_URL + 'profile/activity';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'get',
        headers: headers,
    }).then((response) => {
        return response.json();
    });
}



export function likePost(data) {
    let url = BASE_URL + 'post/like';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type' : 'application/json'
    }

    return fetch(url, {
        method: 'post',
        headers: headers,
        body : JSON.stringify(data)
    }).then((response) => {
        return response.json();
    });
}

export function unLikePost(data) {
    let url = BASE_URL + 'post/unlike';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type' : 'application/json'
    }

    return fetch(url, {
        method: 'post',
        headers: headers,
        body : JSON.stringify(data)
    }).then((response) => {
        return response.json();
    });
}

export function getAllPostComment(post_id) {
    let url = BASE_URL + 'post/comment/all/' + post_id;
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'get',
        headers: headers,
    }).then((response) => {
        return response.json();
    });
}


export function postPostComment(data) {
    let url = BASE_URL + 'post/comment/create';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type' : 'application/json'
    }

    return fetch(url, {
        method: 'post',
        headers: headers,
        body : JSON.stringify(data)
    }).then((response) => {
        return response.json();
    });
}

export function getComment(comment_id) {
    let url = BASE_URL + 'post/comment/' + comment_id;
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'get',
        headers: headers,
    }).then((response) => {
        return response.json();
    });
}

export function postDelete(data) {
    let url = BASE_URL + 'post/delete';
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type' : 'application/json'
    }

    return fetch(url, {
        method: 'delete',
        headers: headers,
        body : JSON.stringify(data)
    }).then((response) => {
        return response.json();
    });
}

export function searchProfile(search) {
    let url = BASE_URL + 'profile/user/search/' + search;
    console.log(url);

    let headers = {
        'X-CSRFToken': getCSRFToken(),
    }

    return fetch(url, {
        method: 'get',
        headers: headers,
    }).then((response) => {
        return response.json();
    });
}