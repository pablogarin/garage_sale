import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CartContext from './context/CartContext';
import Header from './components/Header';
import Catalogue from './components/Catalogue';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import CategoryClient from './api/CategoryClient';
import ProductClient from './api/ProductClient';

const categoryClient = new CategoryClient('http://localhost:5013');
const productClient = new ProductClient('http://localhost:5013');

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(null);
  const value = { cart, setCart, isLoading, setIsLoading };

  useEffect(() => {
    categoryClient.getAll().then(response => setCategories(response));
  }, []);

  return (
    <CartContext.Provider value={value}>
      <CssBaseline />
      <Header categories={categories}/>
      <Container maxWidth="md">
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/category/:categoryId">
            <Catalogue categoryClient={categoryClient}></Catalogue>
          </Route>
          <Route path="/product/:productId">
            <ProductDetail productClient={productClient}></ProductDetail>
          </Route>
          <Route path="/checkout">
            <h5>Checkout</h5>
          </Route>
          <Route path="/">
            <Catalogue productClient={productClient}></Catalogue>
          </Route>
        </Switch>
      </Container>
    </CartContext.Provider>
  );
}

export default App;
