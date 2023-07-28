import axios from 'axios';
const mainUrl = "https://localhost:44380/";
export default axios.create({
    baseUrl: mainUrl
});