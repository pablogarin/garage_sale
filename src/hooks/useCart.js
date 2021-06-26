import { useContext, useEffect } from 'react';
import CartContext from '../context/CartContext';
import CartClient from '../api/CartClient';

const cartClient = new CartClient('http://localhost:5013');

export const CART_ADD = 'CART_ADD';
export const CART_DEL = 'CART_DEL';
export const CART_EMPTY = 'CART_EMPTY';
export const CART_SET = 'CART_SET';

const useCart = () => {
  const { cart, setCart, isLoading, setIsLoading } = useContext(CartContext);
  const cartId = localStorage.getItem('cartId');
  useEffect(() => {
    const cartId = localStorage.getItem('cartId');
    if (!cart) {
      if (!cartId) {
        cartClient.createCart(({ data: cart }) => {
          localStorage.setItem('cartId', cart.id);
          setCart(cart);
        });
      } else {
        cartClient.get(cartId, (cart) => {
          if (cart.finished) {
            localStorage.setItem('cartId', null);
            setCart(null);
          } else {
            setCart(cart);
          }
        });
      }
    }
  }, [cart, setCart]);
  const dispatch = action => {
    setIsLoading(true);
    const { product } = action.payload;
    switch(action.type) {
      case CART_ADD:
        cartClient.updateCart(
          cartId,
          { products: [{ ...product, quantity: 1 }] },
          ({ data: cart }) => {
            setCart(cart);
            setIsLoading(false);
          }
        );
        break;
      case CART_DEL:
        cartClient.updateCart(
          cartId,
          { products: [{...product, quantity: 0}] },
          ({ data: cart }) => {
            setCart(cart);
            setIsLoading(false);
          }
        );
        break;
      case CART_EMPTY:
        cartClient.updateCart(
          cartId,
          { products: cart.products.map(prd => ({...prd, quantity: 0})) },
          ({ data: cart }) => {
            setCart(cart);
            setIsLoading(false);
          }
        );
        break;
      default: {
        setCart(cart);
      }
    }
  };
  return [cart, dispatch, isLoading];
}

export default useCart;
