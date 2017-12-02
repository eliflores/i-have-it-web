import axios from 'axios'

export const fetchItems = () => {
    return axios.get('http://localhost:3000/item')
        .then((res) => {
            return res.data;
        })
        .catch(error => {
            console.log(error);
        });
};