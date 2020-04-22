import React from "react";

const ProductCard = ({ images, name, price, publisher }) => {
  return (
    <div>
      <img src={process.env.PUBLIC_URL + images[0]} />
      <h3>{name}</h3>
      <span>{publisher}</span>
      <p>{price}</p>
    </div>
  );
};

export default ProductCard;
