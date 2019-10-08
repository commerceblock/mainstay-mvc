import axios from 'axios';

const host = process.env.HOST_API;
const port = process.env.PORT_API;

class ApiService {

    constructor() {
        this.client = axios.create({
            baseURL: `http://${host}:${port}`,
        });
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            this.setAccessToken(accessToken);
        }
    }

    get axiosClient() {
        return this.client;
    }

    /**
     * set access token header to send with every request
     * @param accessToken
     */
    setAccessToken(accessToken) {
        this.client.defaults.headers.common['X-Access-Token'] = accessToken;
    }

    /**
     * do not send x-access-token header
     */
    removeAccessToken() {
        this.client.defaults.headers.common['X-Access-Token'] = null;
    }

}

export default new ApiService();
