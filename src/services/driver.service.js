import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v1/drivers/';

class DriverService {
    getAvailableDrivers() {
        return axios.get(API_URL + 'get_available_drivers',
            { headers: authHeader() }
        );
    }
}

export default new DriverService();
