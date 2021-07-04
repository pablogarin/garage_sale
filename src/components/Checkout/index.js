import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import CheckoutSteps from './components/CheckoutSteps';
import Summary from './components/Summary';
import useCart, { CART_EMPTY } from '../../hooks/useCart';
import CartClient from '../../api/CartClient';
import OrderClient from '../../api/OrderClient';
import UserClient from '../../api/UserClient';

const userClient = new UserClient(process.env.REACT_APP_API_URL);
const cartClient = new CartClient(process.env.REACT_APP_API_URL);
const orderClient = new OrderClient(process.env.REACT_APP_API_URL);

const defaultUserData = {
  email: '',
  name: '',
  lastName: '',
  phone: ''
}

const defaultAddress = {
  fullAddress: '',
  addressLine2: '',
  commune: '',
  region: ''
}

const Checkout = ({ setIsLoading }) => {
  const [userData, setUserData] = useState(defaultUserData);
  const [address, setAddress] = useState(defaultAddress);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [order, setOrder] = useState(null);
  const [cart, dispatch] = useCart()
  const history = useHistory();

  useEffect(() => {
    if (cart) {
      setOrder(order => ({ ...order, products: cart.products }))
    } else {
      history.push('/');
    }
  }, [cart, history]);

  useEffect(() => {
    if (order?.id) {
      setIsLoading(true);
      try {
        cartClient.updateCart(cart.id, { finished: true }, () => {
          localStorage.removeItem('cartId');
          dispatch({type: CART_EMPTY});
          setIsLoading(false);
          history.push(`/thank-you/${order.id}`);
        });
      } catch (err) {
        setIsLoading(false);
      }
    }
  }, [order, history, dispatch, cart, setIsLoading]);

  const finishOrder = async () => {
    setIsLoading(true);
    try {
      let user = userData;
      if (!userData.id) {
        user = await userClient.create(userData);
      }
      const orderResult = await orderClient.create({ ...order, user });
      setOrder(orderResult);
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }
  return (
    <Box py={3}>
      <Grid container spacing={2} justify="space-between">
        <Grid item sm={12} md={8}>
          <Paper>
            <Box p={2}>
              <CheckoutSteps
                address={address}
                setAddress={setAddress}
                userData={userData}
                setUserData={setUserData}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                dispatchType="pickup"
                finishOrder={finishOrder}
                setIsLoading={setIsLoading}
                userClient={userClient}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={12} md={4}>
          <Summary cart={cart} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Checkout;
