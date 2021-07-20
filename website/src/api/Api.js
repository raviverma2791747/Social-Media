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
    fetch(BASE_URL + 'getcsrf', {
        method: 'get',
    }).then((response) => {
        response.json();
    })
}

export function getCSRFToken() {
    return getCookie('csrftoken');
}

export function accountLogin(data) {
    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    return fetch(BASE_URL + 'account/login', {
        method: 'post',
        body: JSON.stringify(data),
        headers: headers
    }).then((response) => {
        fetchCSRFToken();
        return response.json();
    })
}

export function accountRegister(data) {
    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    return fetch(BASE_URL + 'account/register', {
        method: 'post',
        body: JSON.stringify(data),
        headers: headers
    }).then((response) => {
        fetchCSRFToken();
        return response.json();
    })
}

export function accountLogout(data) {
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
    let headers = {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json'
    }

    return fetch(BASE_URL + 'account/isauthenticated', {
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


