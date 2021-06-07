import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useRouteMatch
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './components/Header';
import Catalogue from './components/Catalogue';
import ProductDetail from './components/ProductDetail';

function App() {
  const [product, setProduct] = useState(null);
  const [productList, setProductList] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const isPathProduct = useRouteMatch('/product/:productId')
  useEffect(() => {
    const product = {
      _id: parseInt(Math.random()*1000),
      name: 'Lavadora Samsung',
      image: '/img/Lavadora.png',
      price: 200000,
      availableDate: Date()
    }
    setProductList([product, product])
  }, []);
  useEffect(() => {
    if (product) {
      history.push(`/product/${product._id}`)
    }
  }, [product, history]);
  console.log('LOCATION', location);
  useEffect(() => {
    
  }, [location]);
  return (
    <div>
      <CssBaseline />
      <Header />
      <Container>
        <Switch>
          <Route path="/cart">
            <h1>Carro</h1>
          </Route>
          <Route path="/category/:categoryName">
            <Catalogue></Catalogue>
          </Route>
          <Route path="/product/:productId">
            <ProductDetail {...product}></ProductDetail>
          </Route>
          <Route path="/">
            <Catalogue name="home" products={productList} setProduct={setProduct}></Catalogue>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
