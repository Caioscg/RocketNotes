import axios from "axios" //npm install axios

export const api = axios.create({
    baseURL: "https://rocketnotes-api-x6sg.onrender.com"
})

