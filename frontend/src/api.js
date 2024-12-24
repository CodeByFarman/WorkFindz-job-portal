import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/resumes", // Update to match your backend URL
});

export const createResume = (data) => API.post("/", data);
