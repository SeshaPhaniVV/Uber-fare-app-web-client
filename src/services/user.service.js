import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v1/users/';

class UserService {
  getRidesDetails() {
    return axios.get(API_URL + 'get_rides',
        { headers: authHeader(), params: { user_id: 1 } }
        );
  }

  getUserBoard() {
    return axios.get(API_URL + 'auto_login', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
