import { useState, useEffect } from "react";
import { appleProductsDb } from "../data/db";
import type { CartItem as CartItemType } from "../types";

export default function useCart() {
    // Usamos 'products' en lugar de 'data' para que sea más descriptivo
  const [products] = useState(appleProductsDb);
  
  const [cart, setCart] = useState<CartItemType[]>(() => {
    const storageCart = localStorage.getItem("cart");
    return storageCart ? JSON.parse(storageCart) : [];
  });

  function addToCart(id: number) {
    const itemExist = cart.findIndex(item => item.id === id);

    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      const itemToAdd = products.find(product => product.id === id);
      if (itemToAdd) { 
        setCart([...cart, { ...itemToAdd, quantity: 1 }]);
      }
    }
  }

  function increaseQuantity(id: number) {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id: number) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function removeFromCart(id: number) {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }

  function cleanCart() {
    setCart([]);
  }

  const totalCart = cart.reduce((total, item) => total + item.precio * item.quantity, 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return {
        products,
        cart,
        totalCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cleanCart
    }
}