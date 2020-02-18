import axios from 'axios'
import Vue from 'vue'

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'https://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
