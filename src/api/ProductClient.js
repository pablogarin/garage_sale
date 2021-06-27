import axios from 'axios';

class ProductClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getAll(callback) {
    const categories = await axios.request({
      url: `${this.apiUrl}/product`,
      method: 'GET'
    });
    if (typeof callback === 'function') {
      callback(categories.data);
    }
    return categories.data
  }
  async get(id, callback) {
    const product = await axios.request({
      url: `${this.apiUrl}/product/${id}?category=1`,
      method: 'GET'
    });
    if (typeof callback === 'function') {
      callback(product.data);
    }
    return product.data;
  }
}

export default ProductClient;
