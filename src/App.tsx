import { useState, useEffect } from "react";
import { appleProductsDb } from "./data/db"; // Renombrado de suenoTiagoDb
import ProductItem from "./components/ProductItem.tsx";
import CartItem from "./components/CartItem";
import type { CartItem as CartItemType } from "./types";

export default function App() {
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

  return (
    <>
      <header className="bg-white border-b border-gray-200 py-6">
        <h1 className="flex justify-center font-bold text-4xl text-gray-900">Apple Store</h1>
      </header>

      <main className="max-w-6xl mx-auto mt-10 p-5"> 
        <div className="flex flex-col md:flex-row gap-10 items-start">
    
          {/* COLUMNA IZQUIERDA: Carrito de Compras */}
          <aside className="w-full md:w-1/3 sticky top-5">
            <CartItem
              cart={cart}
              totalCart={totalCart}
              cleanCart={cleanCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          </aside>

          {/* COLUMNA DERECHA: Listado de Productos */}
          <section className="w-full md:w-2/3 space-y-4">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product} // Prop ahora se llama 'product'
                addToCart={addToCart}
              />
            ))}
          </section>

        </div>
      </main>
    </>
  );
}