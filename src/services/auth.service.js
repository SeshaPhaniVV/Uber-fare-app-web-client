import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/users/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        if (response.data.error) {
          throw new Error('Invalid username or password');
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL, {
      username: user.username,
      password: user.password
    });
  }
}

export default new AuthService();
