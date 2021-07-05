import axios from 'axios';

class CartClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async get(id, callback) {
    const cart = await axios.request({
      url: `${this.apiUrl}/carts/${id}?products=1`,
      method: 'GET'
    });
    if (typeof callback === 'function') {
      callback(cart.data);
    }
    return cart.data;
  }

  async createCart(callback) {
    const cart = await axios.request({
      url: `${this.apiUrl}/carts`,
      method: 'POST',
      data: {
        products: []
      }
    });
    if (typeof callback === 'function') {
      callback(cart);
    }
    return cart;
  }

  async updateCart(id, payload, callback) {
    const cart = await axios.request({
      url: `${this.apiUrl}/carts/${id}`,
      method: 'PUT',
      data: {
        products: payload.products || []
      }
    });
    if (typeof callback === 'function') {
      callback(cart);
    }
    return cart;
  }
}

export default CartClient;
