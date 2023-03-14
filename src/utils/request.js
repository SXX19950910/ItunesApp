import axios from 'axios'


const request = axios.create({
    baseURL: 'https://itunes.apple.com/hk',
    timeout: 1000 * 60
})


request.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
    return response.data || response
}, function (error) {
    return Promise.reject(error)
})


export default request