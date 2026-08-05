import axios from "axios";

const API =
axios.create({

baseURL:
import.meta.env.VITE_API_URL,

});

export const getTests =
()=>API.get("/tests");

export const getTestById =
(id)=>API.get(`/tests/${id}`);