import React from 'react';
import axios from 'axios';

const FIELD_API_BASE_URL = "http://localhost:8080/api/fields"

class FieldService {
    /*getFields(params) {
        return axios.get(FIELD_API_BASE_URL + '/',
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } });
    }*/
    getFieldswithPage(currentPage, pageLimit) {
        return axios.get(FIELD_API_BASE_URL + '/?page='+currentPage+'&size='+pageLimit,
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } })
    }

    getAllFields() {
        return axios.get(FIELD_API_BASE_URL + '/all/');
    }

    getFieldsIsActive() {
        return axios.get(FIELD_API_BASE_URL + '/active/');
    }

    createField(field) {
        return axios.post(FIELD_API_BASE_URL + '/', field,
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } });
    }

    getFieldById(fieldId) {
        return axios.get(FIELD_API_BASE_URL + '/' + fieldId,
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } });
    }

    updateField(field, fieldId) {
        return axios.put(FIELD_API_BASE_URL + '/' + fieldId, field,
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } },
        );
    }

    deleteField(fieldId) {
        return axios.delete(FIELD_API_BASE_URL + '/' + fieldId,
            { headers: { authorization: sessionStorage.getItem("USER_AUTHORIZATION") } });
    }
}

export default new FieldService()