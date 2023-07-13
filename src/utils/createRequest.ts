import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const userData: any = localStorage.getItem("currentUser");
const d = JSON.parse(userData);

export const newRequest = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
})