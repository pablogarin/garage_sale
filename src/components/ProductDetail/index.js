import React from 'react';

const ProductDetail = (props) => {
  const {
    name,
    image,
    price,
    availableDate
  } = props;
  return (
    <div>
      <div>{name}</div>
      <div>{image}</div>
      <div>{price}</div>
      <div>{availableDate}</div>
    </div>
  );
}

export default ProductDetail;
