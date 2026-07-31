import axios from "axios";

const API =
axios.create({

baseURL:
"http://localhost:5000/api"

});

export const getTests =
()=>API.get("/tests");

export const getTestById =
(id)=>API.get(`/tests/${id}`);