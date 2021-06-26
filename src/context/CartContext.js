import React from 'react';

const CartContext = React.createContext({
  cart: null,
  setCart: () => {}
});

export default CartContext;
