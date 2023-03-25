import axios from 'axios';

const getBaseUrl = () => {
    let url;
    switch (process.env.REACT_APP_ENV) {
        case 'production':
            url = 'https://celestial-tvt7.onrender.com/';
            break;
        case 'http://localhost:5000/http://localhost:5000/':
        default:
            url = 'http://localhost:5000/';
    }
    return url;
}

export default axios.create({
    baseURL: getBaseUrl(),
});