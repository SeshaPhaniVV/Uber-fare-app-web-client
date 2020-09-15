import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v1/users/';

class UserService {
  getUserBoard() {
    return axios.get(API_URL + 'auto_login', { headers: authHeader() });
  }
}

export default new UserService();
