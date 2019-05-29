import axios from 'axios'

const baseDomain = 'localhost:8000'
const baseURL = `http://${baseDomain}`

export default axios.create({
    baseURL: baseURL
})