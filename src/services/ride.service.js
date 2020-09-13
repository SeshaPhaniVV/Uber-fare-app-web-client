import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v1/rides/';

class RideService {
    requestRide() {
        return axios.post(API_URL + 'get_rides',
            { headers: authHeader(), params: { user_id: 1 } }
        );
    }
}

export default new RideService();
