import axios from 'axios'

const token = document.cookie.ssTok || 'null'

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://sweep-steaks.herokuapp.com/api' : 'https://localhost:3000/api',
  headers: {
    'authorisation': token,
    'Content-Type': 'application/json',
  }
})
