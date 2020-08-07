import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ images, name, price, publisher, linkURL }) => {
  return (
    <Link className="view__card" to={linkURL}>
      <img
        className="card__image"
        alt={name}
        src={process.env.PUBLIC_URL + images[0]}
      />
      <div className="card__content">
        <h3 className="card__title">{name}</h3>
        <span className="card__small">{publisher}</span>
        <p className="card__price">{price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
