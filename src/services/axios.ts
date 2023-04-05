import axios from 'axios'
import { getAuthorizationToken } from '../helpers/sessionItens'


export const  api = axios.create({
    baseURL:'http://localhost:3001/',
    timeout: 1000,
})

api.interceptors.request.use( async ( config : any) => {
    const token = getAuthorizationToken()

    if(token) config.headers.authorization = token

    return config
})

api.interceptors.response.use((response)=>{
    if(response && response.status > 399){
        console.log('response',response)
        return new Promise((resolve, reject) => {
            reject(response)
        })
    }
    return response;
},
(error)=>{
    return Promise.resolve(error)
}

)
