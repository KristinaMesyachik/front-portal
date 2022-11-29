import React from 'react';
import axios from 'axios';

const FIELD_API_BASE_URL = "http://localhost:8080/api/responses"

class ResponseService {
    getResponses(currentPage, pageLimit) {
        return axios.get(FIELD_API_BASE_URL + '/?page='+currentPage+'&size='+pageLimit,
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } }
        );
    }

    createResponse(response) {
        return axios.post(FIELD_API_BASE_URL + '/', response
        //,
        //    { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } },
        );
    }
}

export default new ResponseService()