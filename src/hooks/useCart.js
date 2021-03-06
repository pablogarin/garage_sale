import { useContext, useEffect } from 'react';
import CartContext from '../context/CartContext';
import CartClient from '../api/CartClient';

const cartClient = new CartClient(process.env.REACT_APP_API_URL);

export const CART_ADD = 'CART_ADD';
export const CART_DEL = 'CART_DEL';
export const CART_EMPTY = 'CART_EMPTY';
export const CART_SET = 'CART_SET';

const useCart = () => {
  const { cart, setCart, isLoading, setIsLoading } = useContext(CartContext);
  const cartId = localStorage.getItem('cartId');
  
  useEffect(() => {
    const getCart = async () => {
      if (!isLoading) {
        setIsLoading(true);
        try {
          const response = await cartClient.get(cartId);
          if (response.finished) {
            localStorage.removeItem('cartId');
            setCart(null);
          } else {
            setCart(response);
          }
        } catch (e) {
          localStorage.removeItem('cartId');
          setCart(null);
        } finally {
          setIsLoading(false);
        }
      }
    }
    const createCart = async () => {
      if (!isLoading) {
        setIsLoading(true);
        try {
          const { data: cart } = await cartClient.createCart();
          localStorage.setItem('cartId', cart.id);
          setCart(cart);
        } catch (e) {
          console.error('Unable to create cart', e);
        } finally {
          setIsLoading(false);
        }
      }
    }
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      createCart()
    } else {
      if (!cart) {
        getCart();
      }
    }
  }, [isLoading, setIsLoading, cart, setCart]);

  const dispatch = async (action) => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        switch(action.type) {
          case CART_ADD:{
            const { product } = action.payload;
            if (product.stock <= 0) {
              throw new Error('not enough stock');
            }
            const { data } = await cartClient.updateCart(
              cartId,
              { products: [{ ...product, quantity: 1 }] },
            );
            setCart(data);
            break;
          }
          case CART_DEL:{
            const { product } = action.payload;
            const { data } = await cartClient.updateCart(
              cartId,
              { products: [{...product, quantity: 0}] }
            );
            setCart(data);
            break;
          }
          case CART_EMPTY:{
            if (cartId) {
              const response = await cartClient.updateCart(
                cartId,
                { products: cart.products.map(prd => ({...prd, quantity: 0})) }
              );
              setCart(response);
            }
            break;
          }
          default: {
            setCart(cart);
          }
        }
      } catch (e) {
        alert(`Error: ${e}`);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return [cart, dispatch, isLoading];
}

export default useCart;
