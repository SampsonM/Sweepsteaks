import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://sweep-steaks.herokuapp.com/api' : 'https://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
