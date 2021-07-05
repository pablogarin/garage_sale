import axios from 'axios';

class CategoryClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getAll() {
    const categories = await axios.request({
      url: `${this.apiUrl}/categories`,
      method: 'GET'
    });
    return categories.data
  }
  async get(id, callback) {
    const category = await axios.request({
      url: `${this.apiUrl}/categories/${id}?products=1`,
      method: 'GET'
    });
    callback(category.data);
  }
}

export default CategoryClient;
