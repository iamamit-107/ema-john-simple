import React from "react";
import "./cart.css";
import { Link } from "react-router-dom";

const Cart = props => {
  const cart = props.cart;
  //console.log(cart);
  const total = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const tax = total / 10;
  const decimal = num => {
    const numbers = num.toFixed(2);
    return Number(numbers);
  };
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.5;
  } else {
    shipping = 7.5;
  }

  const subTotal = tax + total + shipping;
  const finalSubTotal = decimal(subTotal);
  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items Orderd: {cart.length} </p>
      <p>Items: {decimal(total)} </p>
      <p>Shipping: {shipping}</p>
      <p>Tax : {decimal(tax)}</p>
      <p>Total Amount: {finalSubTotal} </p>
      {props.children}
    </div>
  );
};

export default Cart;
