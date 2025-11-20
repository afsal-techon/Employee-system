import axios from  'axios';

const API = axios.create({
    baseURL :"https://wzk3jd11-3001.inc1.devtunnels.ms",
    headers:{
        "Content-Type":"application/json"
    }
});


API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export default  API;