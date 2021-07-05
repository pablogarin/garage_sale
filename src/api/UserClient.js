import axios from 'axios';

class UserClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async get(id, callback) {
    const response = await axios.request({
      url: `${this.apiUrl}/users/${id}`,
      method: 'GET'
    });
    if (typeof callback === 'function') {
      callback(response.data);
    }
    return response.data;
  }

  async find(email, callback) {
    const response = await axios.request({
      url: `${this.apiUrl}/users?email=${email}`,
      method: 'GET'
    });
    if (typeof callback === 'function') {
      callback(response.data);
    }
    return response.data;
  }

  async create(userData, callback) {
    const response = await axios.request({
      url: `${this.apiUrl}/users`,
      method: 'POST',
      data: {
        'first_name': userData.name,
        'last_name': userData.lastName,
        email: userData.email,
        phone: userData.phone
      }
    })
    if (typeof callback === 'function') {
      callback(response.data);
    }
    return response.data;
  }

  async update(id, userData, callback) {
    const response = await axios.request({
      url: `${this.apiUrl}/users/${id}`,
      method: 'PUT',
      data: {
        'first_name': userData.name,
        'last_name': userData.lastName,
        email: userData.email,
        phone: userData.phone
      }
    })
    if (typeof callback === 'function') {
      callback(response.data);
    }
    return response.data;
  }
}

export default UserClient;
