


import axios from 'axios'

const token = localStorage.getItem('access_token')

const apiServer = axios.create({
    baseURL: 'http://promolider.xyz/api/v1',
})

apiServer.defaults.headers.common['Authorization'] = `Bearer ${token}`;
apiServer.defaults.headers.post['Accept'] = 'application/json';
apiServer.defaults.headers.post['Content-Type'] = 'application/json';


export default apiServer