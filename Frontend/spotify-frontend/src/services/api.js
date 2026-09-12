import axios from "axios";

const api = axios.create({
    baseURL: "https://cooperative-elegance-production-07a5.up.railway.app",
    withCredentials: true
});

export default api;