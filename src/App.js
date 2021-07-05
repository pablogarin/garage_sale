import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Banner from './components/Banner';
import Cart from './components/Cart';
import CartContext from './context/CartContext';
import Catalogue from './components/Catalogue';
import Checkout from './components/Checkout';
import CategoryClient from './api/CategoryClient';
import Header from './components/Header';
import ProductClient from './api/ProductClient';
import ProductDetail from './components/ProductDetail';
import ThankYouPage from './components/ThankYouPage';

const categoryClient = new CategoryClient(process.env.REACT_APP_API_URL);
const productClient = new ProductClient(process.env.REACT_APP_API_URL);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[600],
    },
    secondary: {
      main: deepOrange[200],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    marginBottom: 80,
  },
  whatsappBtn: {
    backgroundColor: '#075E54',
    color: '#fff',
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 1002,
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#128C7E',
    }
  }
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
    <ThemeProvider theme={theme}>
      <CartContext.Provider value={value}>
        <CssBaseline />
        <Header categories={categories}/>
        <Container maxWidth="lg" className={classes.root}>
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
            <Route path="/thank-you/:orderId">
              <ThankYouPage />
            </Route>
            <Route path="/checkout">
              <Checkout setIsLoading={setIsLoading} />
            </Route>
            <Route path="/">
              <Banner />
              <Catalogue productClient={productClient}></Catalogue>
            </Route>
          </Switch>
        </Container>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </CartContext.Provider>
      <Fab
        variant="extended"
        onClick={() => window.open('https://wa.me/56948718009')}
        className={classes.whatsappBtn}
      >
        <WhatsAppIcon fontSize="large" />
        &nbsp;Contacto
      </Fab>
    </ThemeProvider>
  );
}

export default App;
