import React from 'react';
import axios from 'axios';

const FIELD_API_BASE_URL = "http://localhost:8080/api/fields"

class FieldService {
    getFields(params) {
        return axios.get(FIELD_API_BASE_URL + '/', {params});
    }

    createField(field) {
        return axios.post(FIELD_API_BASE_URL + '/', field);
    }

    getFieldById(fieldId) {
        return axios.get(FIELD_API_BASE_URL + '/' + fieldId);
    }

    updateField(field, fieldId) {
        return axios.put(FIELD_API_BASE_URL + '/' + fieldId, field);
    }

    deleteField(fieldId) {
        return axios.delete(FIELD_API_BASE_URL + '/' + fieldId);
    }
}

export default new FieldService()