import axios from 'axios';
const mainUrl = window.location.hostname === "localhost"
  ? "https://localhost:44380/"
  : "https://10.0.0.3:44380/";
export default axios.create({
    baseUrl: mainUrl
});