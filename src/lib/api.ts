import axios from 'axios'

const API = axios.create({
  baseURL: 'https://credinet-backend.onrender.com',
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
