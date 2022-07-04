import React from 'react';
import axios from 'axios';

const FIELD_API_BASE_URL = "http://localhost:8080/api/users"

class UserService {
    login(username, password) {
        return axios.get(FIELD_API_BASE_URL + '/login/',
            { headers: { authorization: this.createBasicAuthToken(username, password) } });
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem("USER_NAME_SESSION_ATTRIBUTE_NAME", username)
        sessionStorage.setItem("USER_AUTHORIZATION", 'Basic ' + window.btoa(username + ":" + password))
    }

    singup(user) {
        return axios.post(FIELD_API_BASE_URL + '/signup/', user);
    }

    findByUsername() {
        return axios.get(FIELD_API_BASE_URL + '/',
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } });
    }

    update(user) {
        return axios.put(FIELD_API_BASE_URL + '/', user,
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } }
        );
    }

    editPassword(params) {
        return axios.get(FIELD_API_BASE_URL + '/editPassword/?password=' + params.password + '&newPassword=' + params.newPassword+'',
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } }
        );
    }
}

export default new UserService()