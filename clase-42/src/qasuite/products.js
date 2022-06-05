import axios from 'axios';
import config from '../utils/config.js';

let pathTest = {
    path: `qa/getProducts`
}

let options = {
    url: `http://localhost:8181/${pathTest.path}`,
    method: 'GET'
}

axios(options)
    .then(response => {
        let docs = response.data
        console.log(docs)
    })
    .catch(error => {
        console.log(error)
    })
