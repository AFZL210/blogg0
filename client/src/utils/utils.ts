import axios from "axios"
const CLOUDINARY_URL = import.meta.env.VITE_APP_CLOUDINARY_URL;
const CLOUDINARY_PRESET = import.meta.env.VITE_APP_CLOUDINARY_PRESET;
const VITE_APP_CLOUDINARY_USERNAME = import.meta.env.VITE_APP_CLOUDINARY_USERNAME;

export const upload = async (file: File | null) => {
    const data = new FormData();
    data.append("file", file || "");
    data.append("upload_preset", "best-bloggin-app")
    data.append("cloud_name", "primeflix")

    const res = await axios.post(CLOUDINARY_URL, data);
    return res.data.secure_url;
}