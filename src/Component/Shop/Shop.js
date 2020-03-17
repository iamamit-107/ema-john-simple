import React, { useState, useEffect } from "react";
import "./shop.css";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

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

  const handleAddProduct = product => {
    const toBeAdded = product.key;
    let count = 1;
    let newCart;
    const sameProduct = cart.find(pd => pd.key === toBeAdded);
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeAdded);
      newCart = [...others, product];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    //console.log(total.length);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="shop-item">
      <div className="product">
        {products.map(product => (
          <Product
            key={product.key}
            showAddToCart={true}
            handleClick={handleAddProduct}
            product={product}
          />
        ))}
      </div>
      <div className="cart">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="addToCart">Review</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
