import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Cart from './components/Cart';
import CartContext from './context/CartContext';
import Catalogue from './components/Catalogue';
import CategoryClient from './api/CategoryClient';
import Header from './components/Header';
import ProductClient from './api/ProductClient';
import ProductDetail from './components/ProductDetail';

const categoryClient = new CategoryClient('http://localhost:5013');
const productClient = new ProductClient('http://localhost:5013');

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(null);
  const value = { cart, setCart, isLoading, setIsLoading };
  const classes = useStyles();

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
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </CartContext.Provider>
  );
}

export default App;
