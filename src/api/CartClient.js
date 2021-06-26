import axios from 'axios';

class CartClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async get(id, callback) {
    const cart = await axios.request({
      url: `${this.apiUrl}/cart/${id}?products=1`,
      method: 'GET'
    });
    callback(cart.data);
  }

  async createCart(callback) {
    const cart = await axios.request({
      url: `${this.apiUrl}/cart`,
      method: 'POST',
      data: {
        products: []
      }
    })
    callback(cart)
  }

  async updateCart(id, payload, callback) {
    const cart = await axios.request({
      url: `${this.apiUrl}/cart/${id}`,
      method: 'PUT',
      data: {
        products: payload.products || []
      }
    })
    callback(cart)
  }
}

export default CartClient;
