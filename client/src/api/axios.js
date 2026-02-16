import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// attach user token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("userToken");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
