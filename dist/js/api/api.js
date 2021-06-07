
// const axios = require('axios');

// const instance = axios.create({
//     baseURL: 'http://localhost:3000/api/',
//     timeout: 1000
//     // headers: {'X-Custom-Header': 'foobar'}
// });

axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';