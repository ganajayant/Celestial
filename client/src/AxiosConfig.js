import axios from 'axios';

const getBaseUrl = () => {
    let url;
    switch (process.env.REACT_APP_ENV) {
        case 'production':
            url = 'https://backend-vtpg.onrender.com/';
            break;
        case 'development':
        default:
            url = 'http://localhost:5000/';
    }
    return url;
}

export default axios.create({
    baseURL: getBaseUrl(),
});