import axios from 'axios'
import Vue from 'vue'

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://sweep-steaks.herokuapp.com/api' : 'https://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'authorisation': Vue.$cookies.get('ssTok')
  },
  withCredentials: true
})
