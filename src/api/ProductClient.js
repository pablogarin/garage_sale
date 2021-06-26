import axios from 'axios';

class ProductClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getAll() {
    const categories = await axios.request({
      url: `${this.apiUrl}/product`,
      method: 'GET'
    });
    return categories.data
  }
  async get(id, callback) {
    const product = await axios.request({
      url: `${this.apiUrl}/product/${id}?category=1`,
      method: 'GET'
    });
    callback(product.data);
  }
}

export default ProductClient;
