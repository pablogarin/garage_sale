const product = {
  name: 'Lavadora Samsung',
  image: '/img/Lavadora.png',
  price: 200000,
  availableDate: Date()
}

class CategoryClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  getAll() {
    return [
      {
        _id: 0,
        name: 'Home',
        products: [
          {_id: 1, ...product},
          {_id: 2, ...product}
        ]
      },
      {
        _id: 1,
        name: 'Electrodomesticos',
        products: []
      }
    ]
  }
  get(id, callback) {
    const category = this.getAll().find(cat => `${cat._id}` === id);
    callback(category);
  }
}

export default CategoryClient;
