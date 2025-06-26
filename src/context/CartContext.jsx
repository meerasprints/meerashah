'use client';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.color === item.color &&
        cartItem.side === item.side &&
        cartItem.price === item.price
    );

    if (existingIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += item.quantity;
      updatedCart[existingIndex].total += item.total;
      setCartItems(updatedCart);
    } else {
      setCartItems((prev) => [...prev, item]);
    }
  };

 const updateQuantity = (index, newQty) => {
  setCartItems((prev) => {
    const updated = [...prev];
    const item = updated[index];

    item.quantity = newQty;
    item.total = item.pricePerUnit * newQty;

    return updated;
  });
};


  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
