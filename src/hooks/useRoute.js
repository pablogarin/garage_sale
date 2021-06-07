import React, { useState, useEffect } from 'react';
import {
  matchPath,
} from "react-router-dom";

const useRoute = (location) => {
  const [productId, setProductId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  useEffect(() => {
    const homeMatch = matchPath(location.pathname, {
      path: '/',
      exact: true,
    });
    const productMatch = matchPath(location.pathname, {
      path: '/product/:productId',
      exact: true,
    });
    const categoryMatch = matchPath(location.pathname, {
      path: '/category/:categoryName',
      exact: true,
    });
    if (homeMatch) {
      setCategoryId("0");
    }
    if (productMatch) {
      const { productId } = productMatch.params;
      setProductId(productId);
      return;
    }
    if (categoryMatch) {
      const { categoryName } = categoryMatch.params;
      setCategoryId(categoryName);
      return;
    }
  }, [location]);
  return [productId, categoryId];
}

export default useRoute;
