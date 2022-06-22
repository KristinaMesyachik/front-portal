import React from 'react';
import axios from 'axios';

const FIELD_API_BASE_URL = "http://localhost:8080/api/responses"

class ResponseService {
    getResponses(params) {
        return axios.get(FIELD_API_BASE_URL + '/', {params});
    }

    createResponse(field) {
        return axios.post(FIELD_API_BASE_URL + '/', field);
    }
}

export default new ResponseService()