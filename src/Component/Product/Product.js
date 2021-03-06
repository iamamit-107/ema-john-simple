import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./product.css";
import { Link } from "react-router-dom";

const Product = props => {
  const { name, img, seller, price, stock, key } = props.product;
  return (
    <div className="product-item">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-desc">
        <h4>
          <Link to={"/product/" + key}> {name} </Link>
        </h4>
        <p>
          <small>by: {seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>only {stock} left in stock - order soon</small>
        </p>
        {props.showAddToCart && (
          <button
            onClick={() => props.handleClick(props.product)}
            className="addToCart"
          >
            <FontAwesomeIcon icon={faShoppingCart} /> add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
