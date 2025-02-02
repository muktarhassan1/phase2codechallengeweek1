import React, { useState } from 'react';
import './App.css';

const products = [
  { id: 1, name: "T-Shirt", price: 20 },
  { id: 2, name: "Jeans", price: 40 },
  { id: 3, name: "Sneakers", price: 60 },
  { id: 4, name: "Hat", price: 15 },
  { id: 5, name: "Socks", price: 5 }

];

function App() {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      const newCart = [...cart];
      newCart[existingProductIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Function to adjust the quantity of a product
  const adjustQuantity = (productId, action) => {
    const newCart = [...cart];
    const productIndex = newCart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      if (action === 'increase') {
        newCart[productIndex].quantity += 1;
      } else if (action === 'decrease' && newCart[productIndex].quantity > 1) {
        newCart[productIndex].quantity -= 1;
      }
      setCart(newCart);
    }
  };

  // Function to calculate the total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p className="price">${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart">
          
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.name} - ${item.price} x {item.quantity}</p>
              <button onClick={() => adjustQuantity(item.id, 'increase')}>+</button>
              <button onClick={() => adjustQuantity(item.id, 'decrease')}>-</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div className="total">
            <p>Total: ${calculateTotal()}</p>
          </div>
        </div>
      )}
    </div>
  );

}

export default App;