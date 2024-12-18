import axios from 'axios';
const axiosBase = axios.create({
  // baseURL: "http://localhost:5500/",
  baseURL: "https://evangadi-api-jqaq.onrender.com/",
});
export default axiosBase;

