import axios from 'axios';

const host = process.env.HOST_API;
const port = process.env.PORT_API;

class ApiService {

    constructor() {
        this.client = axios.create({
            baseURL: `http://${host}:${port}`,
        });

        console.log(`${host}:${port}`);
    }

    get axiosClient() {
        return this.client;
    }

}

export default new ApiService();
