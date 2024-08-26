import axios from "axios";

const apiUsuarios = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application-json; charset-utf-8",
      "Access-Control-Allow-Origin":"*",
      "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE4Mzc4NjkyLCJleHAiOjE3MTgzODIyOTJ9.VQJxT1kwS7ylMXad052EZO5gqpf379Wll4pHNJH_jkw"
    },
});

export default apiUsuarios;