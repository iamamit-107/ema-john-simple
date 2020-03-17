import React, { useState, useEffect } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import gif from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const handleRemoveItem = productKey => {
    //console.log("clicked", productKey);
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKey = Object.keys(savedCart);
    const counts = productKey.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(counts);
  }, []);

  const handleOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
  };

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={gif} alt="" />;
  }

  return (
    <div className="shop-item">
      <div className="product">
        <h1>
          {/* Review Items {cart.length}{" "}
          {cart.reduce((total, cart) => total + cart.quantity, 0)} */}
          {cart.map(pd => (
            <ReviewItem
              key={pd.key}
              product={pd}
              handleRemove={handleRemoveItem}
            ></ReviewItem>
          ))}
          {thankYou}
        </h1>
      </div>
      <div className="cart">
        <Cart cart={cart}>
          <Link>
            <button onClick={handleOrder} className="addToCart">
              Place Order
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
