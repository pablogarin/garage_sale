import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './components/Header';
import Catalogue from './components/Catalogue';
import ProductDetail from './components/ProductDetail';
import useRoute from './hooks/useRoute';
import CategoryClient from './api/CategoryClient';

const categoryClient = new CategoryClient('http://localhost:5000');

function App() {
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [productId, categoryId] = useRoute(location);

  useEffect(() => {
    categoryClient.get("0", (category) => {
      setCategory(category);
    });
  }, []);
  useEffect(() => {
    if (productId && category?.productList) {
      const product = category.productList.find(prod => `${prod._id}` === productId);
      setProduct(product);
    }
    if (categoryId) {
      categoryClient.get(categoryId, (category) => {
        setCategory(category);
      });
    }
  }, [productId, categoryId, category]);
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
            <Catalogue {...category}></Catalogue>
          </Route>
          <Route path="/product/:productId">
            <ProductDetail {...product}></ProductDetail>
          </Route>
          <Route path="/">
            <Catalogue {...category}></Catalogue>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
