import React from 'react';
import axios from 'axios';

const FIELD_API_BASE_URL = "http://localhost:8080/api/responses"

class ResponseService {
    getResponses(params) {
        return axios.get(FIELD_API_BASE_URL + '/',
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } },
            params
        );
    }

    createResponse(response) {
        return axios.post(FIELD_API_BASE_URL + '/', response,
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } },
        );
    }
}

export default new ResponseService()