import axios from 'axios';

class OrderClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async get(id, callback) {
    const response = await axios.request({
      url: `${this.apiUrl}/order/${id}`,
      method: 'GET'
    });
    if (typeof callback === 'function') {
      callback(response.data);
    }
    return response.data;
  }

  async create(order, callback) {
    const response = await axios.request({
      url: `${this.apiUrl}/order`,
      method: 'POST',
      data: {
        email: order.user.email,
        products: order.products.map(prd => ({
          id: prd.id,
          quantity: prd.quantity
        }))
      }
    })
    if (typeof callback === 'function') {
      callback(response.data);
    }
    return response.data;
  }

  async update(id, data, callback) {
    const response = await axios.request({
      url: `${this.apiUrl}/order/${id}`,
      method: 'PUT',
      data: {
        
      }
    })
    if (typeof callback === 'function') {
      callback(response.data);
    }
    return response.data;
  }
}

export default OrderClient;
