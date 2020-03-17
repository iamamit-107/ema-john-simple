import React from "react";
import "./reviewitem.css";

const ReviewItem = props => {
  const { name, quantity, key, price } = props.product;
  const styleItem = {
    borderBottom: "1px solid lightgray",
    marginLeft: "200px",
    paddingBottom: "5px"
  };
  return (
    <div style={styleItem}>
      <p className="product-name">{name}</p>
      <p>
        <small>Quantity: {quantity}</small>
      </p>
      <p>
        <small>Price: {price}</small>
      </p>
      <button onClick={() => props.handleRemove(key)} className="addToCart">
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
