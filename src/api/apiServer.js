


import router from '@/router';
import axios from 'axios'

const apiServer = axios.create({
    baseURL: 'http://localhost:8081/api',
})
apiServer.defaults.headers.post['Accept'] = 'application/json';
apiServer.defaults.headers.post['Content-Type'] = 'application/json';

apiServer.interceptors.request.use( (config) =>  {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with respo
    config.headers = {
      'x-token': localStorage.getItem('x-token')
    }
    return config;
  })
  apiServer.interceptors.response.use( (response) =>  {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with respo
    
    return response;
  }, ( error ) => {
    
    if(error.response.status === 401){
      router.push({name: 'login'})
    }

    return error
  })
export default apiServer