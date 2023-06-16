import axios from "axios";

export const newRequest = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})