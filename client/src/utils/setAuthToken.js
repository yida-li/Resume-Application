import axios from 'axios'

// This utils function sets the token received after JWT process, into the global header, 
// so that we need not access the token from the backend for each and every request.

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken