import axios from 'axios';

class ProductClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getAll(callback) {
    const response = await axios.request({
      url: `${this.apiUrl}/products`,
      method: 'GET'
    });
    if (typeof callback === 'function') {
      callback(response.data);
    }
    return response.data
  }
  async get(id, callback) {
    const response = await axios.request({
      url: `${this.apiUrl}/products/${id}?category=1`,
      method: 'GET'
    });
    if (typeof callback === 'function') {
      callback(response.data);
    }
    return response.data;
  }
}

export default ProductClient;
