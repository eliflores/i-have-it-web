import axios from 'axios'

const HOST = 'http://localhost:3000';

const errorHandler = (error) => {
    console.log(error);
};

const parseResponse = (response) => {
    return response.data;
};

export const fetchItems = () => {
    return axios.get(`${HOST}/item`)
        .then(parseResponse)
        .catch(errorHandler);
};

export const saveItem = (item) => {
    return axios.post(`${HOST}/item/${item.id}/quantity`, { quantity: item.quantity })
        .then(parseResponse)
        .catch(errorHandler);
};

export const addItem = (item) => {
    return axios.post(`${HOST}/item/`, item)
        .then(parseResponse)
        .catch(errorHandler);
};

export const deleteItem = (itemId) => {
    return axios.delete(`${HOST}/item/${itemId}`)
        .then(parseResponse)
        .then(data => {
            if (data === 'OK!') {
                return Promise.resolve(data);
            }
            return Promise.reject('err');
        })
        .catch(errorHandler);
};